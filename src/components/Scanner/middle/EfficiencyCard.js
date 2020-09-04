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
import "./EfficiencyCardStyle.scss";

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
        const mctClassName = meanCycleTime
          ? `eff-card__item${mct > tt ? "--bad" : "--good"}`
          : "";

        return (
          <div className="eff-card__item">
            <span className={mctClassName}>MCT</span>
            <span className={mctClassName}>
              {meanCycleTime ? meanCycleTime : "--:--:--"}
            </span>
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
        const lctClassName = lastCycleTime
          ? `eff-card__item${lct > tt ? "--bad" : "--good"}`
          : "";

        return (
          <div className="eff-card__item">
            <span className={lctClassName}>LCT</span>
            <span className={lctClassName}>
              {lastCycleTime ? lastCycleTime : "--:--:--"}
            </span>
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
        const efficiency = getEfficiency({
          _line,
          orderNumber,
          menuContent,
          existingOrder,
        });

        const efficiencyClassName = efficiency
          ? `eff-card__item${efficiency < 100 ? "--bad" : "--good"}`
          : "";

        return (
          <div className="eff-card__item eff-card__item--thin">
            <span className={efficiencyClassName}>efficiency</span>
            <span className={efficiencyClassName}>
              {efficiency ? `${efficiency}%` : "--"}
            </span>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="eff-card">
        {this.renderTactTime()}
        <div className="eff-card__item eff-card__item--accent">
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
