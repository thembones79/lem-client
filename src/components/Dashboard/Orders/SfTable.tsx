import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { StoreState } from "../../../reducers";
import { by } from "../../../utils/by";

export interface IColumn<T> {
  name: keyof T;
  label: string;
}

export type RowType<T> = T[];

type OrderType = "asc" | "desc";

export interface SfTableProps<T> {
  columns: IColumn<T>[];
  rows: RowType<T>;
  viewOrderDetails: (_id: string) => void;
}

interface ITarget {
  target: {
    name: string;
    value: string;
  };
}

const SfTable = <T extends { _id: string }>(props: SfTableProps<T>) => {
  const { columns, rows, viewOrderDetails } = props;

  const columnNames = columns.map((column) => column.name);

  const [dataTable, setDataTable] = useState<RowType<T>>(rows);
  const [sortingOrder, setSortingOrder] = useState<OrderType>("asc");
  const [sortingColumn, setSortingColumn] = useState<keyof T | "">("");
  const [inputValues, setInputValues] = useState({});

  const handleChange = ({ target: { name, value } }: ITarget) => {
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const sortTableBy = (name: keyof T) => {
    let order = sortingOrder;

    if (name === sortingColumn) {
      if (order === "asc") {
        order = "desc";
        setSortingOrder("desc");
      } else {
        order = "asc";
        setSortingOrder("asc");
      }
    } else {
      setSortingOrder("asc");
      order = "asc";
      setSortingColumn(name);
    }

    setDataTable(dataTable.sort(by(name, order)));
  };

  const renderArrows = (name: keyof T) => {
    if (sortingColumn === name) {
      if (sortingOrder === "asc") {
        return " ↑";
      } else return " ↓";
    }
    return "";
  };

  const filterItems = () => {
    const filteredItems = getFilteredTable() as RowType<T>;

    setDataTable(filteredItems);
  };

  const getFilteredTable = () => {
    return rows.filter(includesAllTheDataFromInputs);
  };

  function includesAllTheDataFromInputs(
    element: Object,
    index: number,
    array: Object[]
  ) {
    const inputs = Object.entries(inputValues);

    let validInputs = 0;

    inputs.forEach((entry) => {
      const [key, value] = entry;

      if (
        //@ts-ignore
        element[key]
          .toString()
          .toLowerCase()
          //@ts-ignore
          .includes(value.toString().toLowerCase())
      ) {
        validInputs++;
      }
    });

    return validInputs === inputs.length;
  }

  const renderInputs = () => {
    return columns.map((column, idx) => {
      const { name } = column;
      return (
        <td key={idx}>
          <input
            className="input is-small mb-3"
            placeholder="search..."
            name={name.toString()}
            defaultValue=""
            onChange={handleChange}
          />
        </td>
      );
    });
  };

  const renderTableHeader = () => {
    return columns.map((column, idx) => {
      const { name, label } = column;
      return (
        <th key={idx} onClick={() => sortTableBy(name)}>
          {label + renderArrows(name)}
        </th>
      );
    });
  };

  const renderTableBody = () => {
    if (dataTable.length > 0) {
      return dataTable.map((row) => {
        const { _id } = row;
        return (
          <tr key={_id} onClick={() => viewOrderDetails(_id)}>
            {columnNames.map((columnName, idx) => (
              <td key={idx}>{row[columnName]}</td>
            ))}
          </tr>
        );
      });
    }
  };

  useEffect(() => filterItems(), [inputValues]);

  return (
    <table className="table is-striped is-narrow is-hoverable is-fullwidth is-size-7">
      <thead>
        <tr>{renderInputs()}</tr>
        <tr>{renderTableHeader()}</tr>
      </thead>
      <tbody className="fixed200 ">{renderTableBody()}</tbody>
    </table>
  );
};

function mapStateToProps(state: StoreState) {
  const { orders, isLoading, errorMessage } = state.dashboard;
  return {
    orders,
    isLoading,
    errorMessage,
  };
}

export default connect(mapStateToProps, actions)(SfTable);
