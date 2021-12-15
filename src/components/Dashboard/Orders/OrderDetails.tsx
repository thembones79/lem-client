import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { OrderDetailsType } from "../../../actions";
import { StoreState } from "../../../reducers";
import Loader from "../../Loader";
import HourlyRates from "./HourlyRates";
import "./OrderDetailsStyle.scss";

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
        givenHourlyRate,
        hourlyRates,
      } = orderDetails;

      return (
        <div className="order-details">
          <div className="order-details__header">
            <h1 className="main-page__title">
              <span className="weight500">order: </span>
              <span className="weight800"> {orderNumber}</span>
            </h1>
            <button
              className="btn btn--finish btn--accent adder-form__select--medium"
              onClick={() => {
                this.props.backToOrdersList();
              }}
            >
              {"<< orders list"}
            </button>
          </div>
          <div className="order-details__stats">
            <div className="order-details__stats__item">
              <div className="order-details__stats__item__label">
                part number
              </div>
              <div className="order-details__stats__item__data">
                {partNumber}
              </div>
            </div>
            <div className="order-details__stats__item">
              <div className="order-details__stats__item__label">status</div>
              <div className="order-details__stats__item__data">
                {orderStatus}
              </div>
            </div>
            <div className="order-details__stats__item">
              <div className="order-details__stats__item__label">quantity</div>
              <div className="order-details__stats__item__data">{quantity}</div>
            </div>
            <div className="order-details__stats__item">
              <div className="order-details__stats__item__label">start</div>
              <div className="order-details__stats__item__data">
                {orderAddedAt}
              </div>
            </div>
            <div className="order-details__stats__item">
              <div className="order-details__stats__item__label">last scan</div>
              <div className="order-details__stats__item__data">
                {lastValidScan}
              </div>
            </div>
            <div className="order-details__stats__item">
              <div className="order-details__stats__item__label">all scans</div>
              <div className="order-details__stats__item__data">
                {scansAlready}
              </div>
            </div>
            <div className="order-details__stats__item">
              <div className="order-details__stats__item__label">
                valid scans
              </div>
              <div className="order-details__stats__item__data">
                {validScans}
              </div>
            </div>
            <div className="order-details__stats__item">
              <div className="order-details__stats__item__label">lines</div>
              <div className="order-details__stats__item__data">
                {linesUsed}
              </div>
            </div>
            <div className="order-details__stats__item">
              <div className="order-details__stats__item__label">
                net duration
              </div>
              <div className="order-details__stats__item__data">{netTime}</div>
            </div>
            <div className="order-details__stats__item">
              <div className="order-details__stats__item__label">
                mean cycle time
              </div>
              <div className="order-details__stats__item__data">
                {meanCycleTime}
              </div>
            </div>
            <div className="order-details__stats__item">
              <div className="order-details__stats__item__label">
                mean hourly pace
              </div>
              <div className="order-details__stats__item__data">
                {
                  //@ts-ignore
                  Number(Math.round(meanHourlyRate + "e+2") + "e-2")
                  // (hack) exponential notation for avoiding the error of performing operations on floating-point number
                }
              </div>
            </div>
            <div className="order-details__stats__item">
              <div className="order-details__stats__item__label">set pace</div>
              <div className="order-details__stats__item__data">
                {givenHourlyRate}
              </div>
            </div>
          </div>
          <div className="order-details__hours">
            <HourlyRates hourlyRates={hourlyRates} />
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
