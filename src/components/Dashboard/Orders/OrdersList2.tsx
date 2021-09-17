import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { OrderListType } from "../../../actions";
import { StoreState } from "../../../reducers";
import Loader from "../../Loader";
import SfTable, { IColumn } from "./SfTable";
import "./OrdersListStyle.scss";

interface IOrdersListProps {
  orders?: OrderListType[];
  viewOrderDetails: (_id: string) => void;
  getOrders: () => void;
  errorMessage: string;
  isLoading: boolean;
}

const columns: IColumn<any>[] = [
  { name: "orderNumber", label: "order" },
  { name: "partNumber", label: "partnumber" },
  { name: "orderStatus", label: "status" },
  { name: "quantity", label: "quantity" },
  { name: "orderAddedAt", label: "start" },
  { name: "lastValidScan", label: "last scan" },
  { name: "validScans", label: "valid scans" },
  { name: "linesUsed", label: "lines" },
];

class OrdersList2 extends Component<IOrdersListProps> {
  componentDidMount() {
    this.props.getOrders();
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { isLoading, errorMessage, orders } = this.props;

    if (errorMessage) {
      return <div className="alert">{this.renderAlert()}</div>;
    }

    if (isLoading) {
      return <Loader />;
    }
    return (
      orders && (
        <div className="table-container">
          <SfTable columns={columns} rows={orders} />
        </div>
      )
    );
  }
}

function mapStateToProps(state: StoreState) {
  const { orders, isLoading, errorMessage } = state.dashboard;
  return {
    orders,
    isLoading,
    errorMessage,
  };
}

export default connect(mapStateToProps, actions)(OrdersList2);
