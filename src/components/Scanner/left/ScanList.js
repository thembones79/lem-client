import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import ScanContent from "./ScanContent";
import "./ScanListStyle.scss";

class ScanList extends Component {
  componentDidMount() {
    if (this.props.orderNumber) {
      this.props.getOrder(this.props.orderNumber);
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
    return <div className="reader__scan-list">{this.renderScanList()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    _line: state.scanner.pickedLine || localStorage.getItem("line"),
    existingOrder: state.scanner.existingOrder,
    isOrderedQuantityMatchesValidScansQuantity:
      state.scanner.isOrderedQuantityMatchesValidScansQuantity,
    enableReinitialize: true,
  };
}

export default connect(mapStateToProps, actions)(ScanList);
