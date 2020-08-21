import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import ScanContent from "./ScanContent";
import "./ScanListStyle.scss";

class ScanList extends Component {
  componentDidMount() {
    this.props.getOrder(this.props.orderNumber);
  }

  renderOrderDetails() {
    if (this.props.menu) {
      const orders = this.props.menu.menuContent;

      const filteredOrders = orders.filter(
        (order) => order.orderNumber === this.props.orderNumber
      );

      return (
        <>
          {filteredOrders.map((order) => {
            const { _id, orderNumber, quantity, customer, partNumber } = order;
            return (
              <div
                key={_id}
                children={`${orderNumber} - ${customer} - ${partNumber} - [${quantity}]`}
              />
            );
          })}
        </>
      );
    }
  }

  renderScanList() {
    if (this.props.existingOrder) {
      return this.props.existingOrder.scans.map((scan) => (
        <ScanContent
          key={scan._id}
          timeStamp={scan.timeStamp}
          errorCode={scan.errorCode}
          scanContent={scan.scanContent}
        />
      ));
    }
  }
  render() {
    return (
      <div className="reader__scan-list">
        {this.renderOrderDetails()}
        {this.renderScanList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //message: state.scanner.message,
    // authenticated: state.auth.authenticated,
    //userType: state.scanner.userType,
    //userName: state.scanner.userName,
    //userId: state.scanner.userId,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    existingOrder: state.scanner.existingOrder,
    orderDetails: state.scanner.orderDetails,
    enableReinitialize: true,
    menu: state.scanner.menu,
  };
}

export default connect(mapStateToProps, actions)(ScanList);
