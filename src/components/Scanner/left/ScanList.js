import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import ScanContent from "./ScanContent";
import warningSound from "../../sounds/warning.wav";
import okSound from "../../sounds/ok.wav";
import errorSound from "../../sounds/error.wav";
import "./ScanListStyle.scss";

class ScanList extends Component {
  warningSfx = new Audio(warningSound);
  errorSfx = new Audio(errorSound);
  okSfx = new Audio(okSound);

  resultsDiv = React.createRef();

  scrollComponentToTop() {
    this.resultsDiv.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
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
      if (scansOnThisLine.length > 0) {
        const lastScanCode = scansOnThisLine[0].errorCode;

        const renderSound = (code) => {
          if (code === "e000") {
            this.playOk();
          } else if (code === "e004") {
            this.playWarning();
          } else {
            this.playError();
          }
        };
        renderSound(lastScanCode);
      }

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

  playWarning = () => {
    this.warningSfx.play();
  };

  playError() {
    this.errorSfx.play();
  }

  playOk = () => {
    this.okSfx.play();
  };

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
