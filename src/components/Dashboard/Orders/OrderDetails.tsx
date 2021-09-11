import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { OrderDetailsType } from "../../../actions";
import { StoreState } from "../../../reducers";
import Loader from "../../Loader";
import HourlyRates from "./HourlyRates";
import "./OrdersListStyle.scss";

interface IOrderDetailsProps {
  _id: string;
  orderDetails: OrderDetailsType;
  isLoading: boolean;
  errorMessage: string;
  getOrderDetails: (_id: string) => void;
  backToOrdersList: () => void;
}

class OrderDetails extends Component<IOrderDetailsProps> {
  componentDidMount() {
    this.props.getOrderDetails(this.props._id);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  renderOrderDetails() {
    const { orderDetails } = this.props;

    if (orderDetails) {
      const {
        orderNumber,
        partNumber,
        orderStatus,
        quantity,
        orderAddedAt,
        lastValidScan,
        scansAlready,
        validScans,
        linesUsed,
        netTime,
        meanCycleTime,
        meanHourlyRate,
        meanGrossHourlyRate,
        standardHourlyRate,
        hourlyRates,
      } = orderDetails;

      return (
        <div>
          <button
            className="btn btn--finish btn--accent adder-form__select--medium"
            onClick={() => {
              this.props.backToOrdersList();
            }}
          >
            {"<< orders list"}
          </button>
          <div>
            <div>{orderNumber}</div>
            <div>{partNumber}</div>
            <div>{orderStatus}</div>
            <div>{quantity}</div>
            <div>{orderAddedAt}</div>
            <div>{lastValidScan}</div>
            <div>{scansAlready}</div>
            <div>{validScans}</div>
            <div>{linesUsed}</div>
            <div>{netTime}</div>
            <div>{meanCycleTime}</div>
            <div>{meanHourlyRate}</div>
            <div>{standardHourlyRate}</div>
            <div>{meanGrossHourlyRate}</div>
          </div>
          <div>
            <table>
              <tbody>
                <HourlyRates hourlyRates={hourlyRates} />
              </tbody>
            </table>
          </div>
        </div>
      );
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
    return <div>{this.renderOrderDetails()}</div>;
  }
}

function mapStateToProps(state: StoreState) {
  const { orderDetails, isLoading, _id, errorMessage } = state.dashboard;
  return {
    orderDetails,
    isLoading,
    _id,
    errorMessage,
  };
}

export default connect(mapStateToProps, actions)(OrderDetails);
