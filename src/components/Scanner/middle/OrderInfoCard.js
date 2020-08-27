import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../../actions";

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
      console.log({ quantity });
      return quantity;
    } else {
      return "--";
    }
  }

  render() {
    return (
      <div>
        <div>
          <span>{this.renderOrderNumber()}</span>
          <span>{this.renderCustomer()}</span>
        </div>
        <div>
          <span>{this.renderPartNumber()}</span>
          <span>
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
  };
}
export default connect(mapStateToProps, actions)(OrderInfoCard);
