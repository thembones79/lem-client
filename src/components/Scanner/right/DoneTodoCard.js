import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../../actions";

class DoneTodoCard extends Component {
  renderDoneOnThisLine() {
    if (this.props.existingOrder) {
      const { scans } = this.props.existingOrder;
      const { _line } = this.props;
      const scansWithoutErrorsOnThisLine = scans.filter(
        (scan) => scan.errorCode === "e000" && scan._line === _line
      ).length;
      return scansWithoutErrorsOnThisLine.toString();
    } else {
      return "--";
    }
  }

  renderTodo() {
    if (this.props.existingOrder) {
      const { scans, quantity } = this.props.existingOrder;
      const scansWithoutErrors = scans.filter(
        (scan) => scan.errorCode === "e000"
      ).length;
      return (quantity - scansWithoutErrors).toString();
    } else {
      return "--";
    }
  }

  render() {
    return (
      <div>
        <span>
          <span>done:</span>
          <span>{this.renderDoneOnThisLine()}</span>
        </span>

        <span>
          <span>todo:</span>
          <span>{this.renderTodo()}</span>
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    _line: state.scanner.pickedLine || localStorage.getItem("line"),
    existingOrder: state.scanner.existingOrder,
  };
}
export default connect(mapStateToProps, actions)(DoneTodoCard);
