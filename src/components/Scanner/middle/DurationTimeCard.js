import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { secondsToHhMmSs } from "../../../utils/secondsToHhMmSs";
import {
  getEstDuration,
  getEstCompletionTime,
  getRealDuration,
  getRealCompletionTime,
} from "../../../utils/calculations";
import "./DurationTimeCardStyle.scss";

class DurationTimeCard extends Component {
  renderDuration() {
    if (this.props.menu && this.props.existingOrder) {
      const { orderNumber, existingOrder, _line } = this.props;
      if (orderNumber && _line) {
        const { orderStatus } = existingOrder;
        const durationInSeconds =
          orderStatus === "closed"
            ? getRealDuration({ existingOrder, _line })
            : getEstDuration({ existingOrder, _line });
        const duration = secondsToHhMmSs(durationInSeconds);
        return (
          <div className="durtime-card__duration">
            <div>{`${orderStatus === "closed" ? "" : "est. "}duration`}</div>
            <div className="durtime-card--bold">
              {duration ? duration : "--:--:--"}
            </div>
          </div>
        );
      }
    }
  }

  renderCompletionTime() {
    if (this.props.menu && this.props.existingOrder) {
      const { orderNumber, existingOrder, _line } = this.props;
      if (orderNumber && _line) {
        const { orderStatus } = existingOrder;
        const completionTime =
          orderStatus === "closed"
            ? getRealCompletionTime({ existingOrder, _line })
            : getEstCompletionTime({ existingOrder, _line });
        return (
          <div className="durtime-card__time">
            <div>{`${
              orderStatus === "closed" ? "" : "est. "
            }completion time`}</div>
            <div className="durtime-card--bold">
              {getEstDuration({ existingOrder, _line })
                ? completionTime
                : "---- -- -- --:--:--"}
            </div>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="durtime-card">
        {this.renderDuration()}
        {this.renderCompletionTime()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    existingOrder: state.scanner.existingOrder,
    menu: state.scanner.menu,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    _line: state.scanner.pickedLine || localStorage.getItem("line"),
  };
}
export default connect(mapStateToProps, actions)(DurationTimeCard);
