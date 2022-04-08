import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { OrderType } from "../../../actions";
import { StoreState } from "../../../reducers";
import "./OrderInfoCardStyle.scss";

interface IOrderInfoCardProps {
  existingOrder?: OrderType;
  readerInputState: {
    isDisabled: boolean;
  };
}

class OrderInfoCard extends Component<IOrderInfoCardProps> {
  renderOrderNumber() {
    if (this.props.existingOrder) {
      const { orderNumber } = this.props.existingOrder;
      return orderNumber;
    } else {
      return "--";
    }
  }

  renderCustomer() {
    if (this.props.existingOrder) {
      const { customer } = this.props.existingOrder;
      return customer;
    } else {
      return "--";
    }
  }

  renderPartNumber() {
    if (this.props.existingOrder) {
      const { partNumber } = this.props.existingOrder;
      return partNumber;
    } else {
      return "--";
    }
  }

  renderQuantity() {
    if (this.props.existingOrder) {
      const { quantity } = this.props.existingOrder;
      return quantity;
    } else {
      return "--";
    }
  }

  renderInProgress() {
    const isInProgress = !this.props.readerInputState.isDisabled;
    return isInProgress ? "orderinfo-card-v2--inprogress" : "";
  }

  render() {
    return (
      <div className="orderinfo-card-v2 ">
        <div className="orderinfo-card-v2__row">
          <span
            className={`orderinfo-card-v2__order ${this.renderInProgress()}`}
          >
            {this.renderOrderNumber()}
          </span>
          <span
            className={`orderinfo-card-v2__customer ${this.renderInProgress()}`}
          >
            {this.renderCustomer()}
          </span>
        </div>
        <div className="orderinfo-card-v2__row">
          <span className={`orderinfo-card-v2__pn ${this.renderInProgress()}`}>
            {this.renderPartNumber()}
          </span>
          <span
            className={`orderinfo-card-v2__quantity ${this.renderInProgress()}`}
          >
            {this.renderQuantity()}
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    existingOrder: state.scanner.existingOrder,
    readerInputState: state.scanner.readerInputState,
  };
}
export default connect(mapStateToProps, actions)(OrderInfoCard);
