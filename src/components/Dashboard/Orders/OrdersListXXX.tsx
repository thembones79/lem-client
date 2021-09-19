import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { OrderListType } from "../../../actions";
import { StoreState } from "../../../reducers";
import Loader from "../../Loader";
import "./OrdersListStyle.scss";

interface IOrdersListProps {
  orders?: OrderListType[];
  viewOrderDetails: (_id: string) => void;
  getOrders: () => void;
  errorMessage: string;
  isLoading: boolean;
}

class OrdersList extends Component<IOrdersListProps> {
  componentDidMount() {
    this.props.getOrders();
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  renderOrdersList() {
    const { orders, viewOrderDetails } = this.props;

    if (orders) {
      return orders.map((order) => {
        const {
          orderNumber,
          _id,
          partNumber,
          orderStatus,
          quantity,
          orderAddedAt,
          lastValidScan,
          scansAlready,
          validScans,
          linesUsed,
        } = order;

        return (
          <tr
            key={_id}
            onClick={() => {
              viewOrderDetails(_id);
            }}
          >
            <td>{orderNumber}</td>
            <td>{partNumber}</td>
            <td>{orderStatus}</td>
            <td>{quantity}</td>
            <td>{orderAddedAt}</td>
            <td>{lastValidScan}</td>
            <td>{scansAlready}</td>
            <td>{validScans}</td>
            <td>{linesUsed}</td>
          </tr>
        );
      });
    }
  }

  render() {
    const { isLoading, errorMessage } = this.props;

    if (errorMessage) {
      return <div className="alert">{this.renderAlert()}</div>;
    }

    if (isLoading) {
      return <Loader />;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>order</th>
            <th>partnumber</th>
            <th>status</th>
            <th>quantity</th>
            <th>start</th>
            <th>last scan</th>
            <th>all scans</th>
            <th>valid scans</th>
            <th>lines</th>
          </tr>
        </thead>
        <tbody>{this.renderOrdersList()}</tbody>
      </table>
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

export default connect(mapStateToProps, actions)(OrdersList);
