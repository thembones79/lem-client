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
  //viewOrderDetails: (_id: string) => void;
}

interface ITarget {
  target: {
    name: string;
    value: string;
  };
}

const SfTable = <T extends { _id: string }>(props: SfTableProps<T>) => {
  const { columns, rows /* viewOrderDetails */ } = props;

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

  const renderInputs = () => {
    return columns.map((column, idx) => {
      const { name } = column;
      return (
        <td key={idx} className="orders-list__filter__wrapper">
          <input
            className="orders-list__filter"
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
        <th
          className="orders-list__label"
          key={idx}
          onClick={() => sortTableBy(name)}
        >
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
          <tr
            key={_id}
            //  onClick={() => viewOrderDetails(_id)}
            className="orders-list__row"
          >
            {columnNames.map((columnName, idx) => (
              <td className="orders-list__row__item" key={idx}>
                {row[columnName]}
              </td>
            ))}
          </tr>
        );
      });
    }
  };

  const renderCount = dataTable ? dataTable.length : 0;

  useEffect(() => {
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
    const getFilteredTable = () => {
      return rows.filter(includesAllTheDataFromInputs);
    };

    const filterItems = () => {
      const filteredItems = getFilteredTable() as RowType<T>;

      setDataTable(filteredItems);
    };

    filterItems();
  }, [inputValues, rows]);

  return (
    <div className="orders-list__page">
      <div className="orders-list__page__header">
        <h1 className="main-page__title">Orders List</h1>
        <h1 className="main-page__title">
          <span className="weight500">count: </span>
          <span className="weight800"> {renderCount}</span>
        </h1>
      </div>

      <div className="orders-list">
        <table>
          <thead className="orders-list__header">
            <tr>{renderInputs()}</tr>
            <tr>{renderTableHeader()}</tr>
          </thead>
          <tbody className="fixed200 ">{renderTableBody()}</tbody>
        </table>
      </div>
    </div>
  );
};

function mapStateToProps(state: StoreState) {
  const { partnumbers, isLoading, errorMessage } = state.dashboard;
  return {
    partnumbers,
    isLoading,
    errorMessage,
  };
}

export default connect(mapStateToProps, actions)(SfTable);
