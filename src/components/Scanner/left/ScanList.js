import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import ScanContent from "./ScanContent";
import "./ScanListStyle.scss";

class ScanList extends Component {
  resultsDiv = React.createRef();

  scrollComponentToTop() {
    this.resultsDiv.current.scrollTo({
      top: 0,
      left: 0,
      // behavior: "smooth",
    });
  }

  componentDidMount() {
    if (this.props.orderNumber) {
      this.props.getOrder(this.props.orderNumber);
    }
  }

  componentDidUpdate(prevProps) {
    this.scrollComponentToTop();
  }

  renderScanList() {
    if (this.props.existingOrder) {
      const { scans } = this.props.existingOrder;
      const { _line } = this.props;
      const scansOnThisLine = scans.filter((scan) => scan._line === _line);

      return scansOnThisLine.map((scan) => (
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
      <div className="scan-list" ref={this.resultsDiv}>
        {this.renderScanList()}
      </div>
    );
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
