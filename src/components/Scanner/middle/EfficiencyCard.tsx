import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { MenuDataType } from "../../../actions";
import { StoreState } from "../../../reducers";
import { secondsToHhMmSs } from "../../../utils/secondsToHhMmSs";
import {
  getTactTime,
  getMeanCycleTime,
  getLastCycleTime,
  getEfficiency,
  IOrder,
  IMenuContent,
} from "../../../utils/calculations";
import "./EfficiencyCardStyle.scss";

interface IEfficiencyCardProps {
  orderNumber?: string | null;
  _line: string;
  existingOrder: IOrder;
  menu: MenuDataType;
}

class EfficiencyCard extends Component<IEfficiencyCardProps> {
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

        const mctClassName = () => {
          if (!mct) {
            return "";
          }

          if (tt / mct > 0.97) {
            return "eff-card__item--good";
          }
          if (tt / mct > 0.8) {
            return "eff-card__item--pretty";
          }
          return "eff-card__item--bad";
        };

        return (
          <div className="eff-card__item">
            <span className={mctClassName()}>MCT</span>
            <span className={mctClassName()}>
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

        const lctClassName = () => {
          if (!lct) {
            return "";
          }

          if (tt / lct > 0.97) {
            return "eff-card__item--good";
          }
          if (tt / lct > 0.8) {
            return "eff-card__item--pretty";
          }
          return "eff-card__item--bad";
        };

        return (
          <div className="eff-card__item">
            <span className={lctClassName()}>LCT</span>
            <span className={lctClassName()}>
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
      const menuContent: IMenuContent[] = this.props.menu.menuContent;
      if (orderNumber) {
        const { _line } = this.props;
        const efficiency = getEfficiency({
          _line,
          orderNumber,
          menuContent,
          existingOrder,
        });

        const efficiencyClassName = () => {
          if (!efficiency) {
            return "";
          }
          if (efficiency > 97) {
            return "eff-card__item--good";
          }
          if (efficiency > 80) {
            return "eff-card__item--pretty";
          }
          return "eff-card__item--bad";
        };

        return (
          <div className="eff-card__item eff-card__item--thin">
            <span className={efficiencyClassName()}>efficiency</span>
            <span className={efficiencyClassName()}>
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

function mapStateToProps(state: StoreState) {
  return {
    existingOrder: state.scanner.existingOrder as IOrder,
    menu: state.scanner.menu,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    _line: state.scanner.pickedLine || (localStorage.getItem("line") as string),
  };
}
export default connect(mapStateToProps, actions)(EfficiencyCard);
