import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { secondsToHhMmSs } from "../../../utils/secondsToHhMmSs";
import {
  getTactTime,
  getMeanCycleTime,
  getLastCycleTime,
  getEfficiency,
} from "../../../utils/calculations";

class EfficiencyCard extends Component {
  renderTactTime() {
    if (this.props.menu) {
      const { orderNumber } = this.props;
      const { menuContent } = this.props.menu;
      if (orderNumber) {
        const tactTime = secondsToHhMmSs(
          getTactTime({ orderNumber, menuContent })
        );
        return (
          <div className="eff-card__item">
            <span>TT</span>
            <span>{tactTime ? tactTime : "--:--:--"}</span>
          </div>
        );
      }
    }
  }

  renderMeanCycleTime() {
    if (this.props.menu) {
      const { orderNumber, existingOrder } = this.props;
      const { menuContent } = this.props.menu;
      if (orderNumber) {
        const { _line } = this.props;
        const mct = getMeanCycleTime({ _line, existingOrder });
        const tt = getTactTime({ orderNumber, menuContent });
        const meanCycleTime = secondsToHhMmSs(mct);

        return (
          <div className={`eff-card${mct > tt ? "--bad" : "--good"}`}>
            <span>MCT</span>
            <span>{meanCycleTime ? meanCycleTime : "--:--:--"}</span>
          </div>
        );
      }
    }
  }

  renderLastCycleTime() {
    if (this.props.menu) {
      const { orderNumber, existingOrder } = this.props;
      const { menuContent } = this.props.menu;
      if (orderNumber) {
        const { _line } = this.props;
        const lct = getLastCycleTime({ _line, existingOrder });
        const tt = getTactTime({ orderNumber, menuContent });
        const lastCycleTime = secondsToHhMmSs(lct);

        return (
          <div className={`eff-card${lct > tt ? "--bad" : "--good"}`}>
            <span>LCT</span>
            <span>{lastCycleTime ? lastCycleTime : "--:--:--"}</span>
          </div>
        );
      }
    }
  }

  renderEfficiency() {
    if (this.props.menu) {
      const { orderNumber, existingOrder } = this.props;
      const { menuContent } = this.props.menu;
      if (orderNumber) {
        const { _line } = this.props;
        const efficiency = `${getEfficiency({
          _line,
          orderNumber,
          menuContent,
          existingOrder,
        })}%`;

        return (
          <div
            className={`eff-card__item--thin eff-card${
              efficiency < 100 ? "--bad" : "--good"
            }`}
          >
            <span>efficiency</span>
            <span>{efficiency ? efficiency : "--"}</span>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="eff-card">
        {this.renderTactTime()}
        <div className="eff-card__item--accent">
          {this.renderMeanCycleTime()}
          {this.renderLastCycleTime()}
        </div>
        {this.renderEfficiency()}
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
export default connect(mapStateToProps, actions)(EfficiencyCard);
