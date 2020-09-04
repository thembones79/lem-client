import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../../actions";
import "./OrderInfoCardStyle.scss";

class OrderInfoCard extends Component {
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

  renderDoneOnAllLines() {
    if (this.props.existingOrder) {
      const { scans } = this.props.existingOrder;
      const scansWithoutErrors = scans.filter(
        (scan) => scan.errorCode === "e000"
      ).length;
      return scansWithoutErrors.toString();
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
    return isInProgress ? "orderinfo-card--inprogress" : "";
  }

  render() {
    return (
      <div className="orderinfo-card ">
        <div className="orderinfo-card__row">
          <span className={`orderinfo-card__order ${this.renderInProgress()}`}>
            {this.renderOrderNumber()}
          </span>
          <span
            className={`orderinfo-card__customer ${this.renderInProgress()}`}
          >
            {this.renderCustomer()}
          </span>
        </div>
        <div className="orderinfo-card__row">
          <span className={`orderinfo-card__pn ${this.renderInProgress()}`}>
            {this.renderPartNumber()}
          </span>
          <span
            className={`orderinfo-card__quantity ${this.renderInProgress()}`}
          >
            {this.renderDoneOnAllLines()}/{this.renderQuantity()}
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    existingOrder: state.scanner.existingOrder,
    readerInputState: state.scanner.readerInputState,
  };
}
export default connect(mapStateToProps, actions)(OrderInfoCard);
