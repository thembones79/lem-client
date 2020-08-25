import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import "./MissingScansStyle.scss";

class MissingScans extends Component {
  zeroAdder(number) {
    if (number < 0) {
      return;
    }
    if (number < 10) {
      return `0000${number}`;
    }
    if (number < 100) {
      return `000${number}`;
    }
    if (number < 1000) {
      return `00${number}`;
    }
    if (number < 10000) {
      return `0${number}`;
    }

    return number;
  }

  generateCompleteScanList() {
    const { quantity } = this.props.existingOrder;
    const { qrCode } = this.props.existingOrder;
    let generatedScans = [];
    for (let i = 1; i <= quantity; i++) {
      generatedScans.push(qrCode + this.zeroAdder(i));
    }
    return generatedScans;
  }

  renderMissingScans() {
    if (this.props.existingOrder) {
      const { scans } = this.props.existingOrder;
      const scansWithoutErrors = scans
        .filter((scan) => scan.errorCode === "e000")
        .map((scan) => scan.scanContent);

      const completeScanList = this.generateCompleteScanList();

      const missingScans = completeScanList.filter(function (scan) {
        return this.indexOf(scan) < 0;
      }, scansWithoutErrors);

      return missingScans.map((scan) => <div key={scan}>{scan}</div>);
    }
  }
  render() {
    return <div className="missing-scans">{this.renderMissingScans()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    existingOrder: state.scanner.existingOrder,
  };
}

export default connect(mapStateToProps, actions)(MissingScans);
