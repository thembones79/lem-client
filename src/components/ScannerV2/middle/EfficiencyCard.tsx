import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  MenuDataType,
  OrderStatisticsType,
  PartnumberConfigType,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import { secondsToHhMmSs } from "../../../utils/secondsToHhMmSs";
import {
  getTactTime,
  getMeanCycleTime,
  IOrder,
} from "../../../utils/calculations";
import "./EfficiencyCardStyle.scss";

interface IEfficiencyCardProps {
  orderNumber?: string | null;
  _line: string;
  existingOrder: IOrder;
  orderStats: OrderStatisticsType;
  pnConfig: PartnumberConfigType;
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
          <div className="eff-card-v2__item">
            <span>Tact time</span>
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
            return "eff-card-v2__item--good";
          }
          if (tt / mct > 0.8) {
            return "eff-card-v2__item--pretty";
          }
          return "eff-card-v2__item--bad";
        };

        return (
          <div className="eff-card-v2__item">
            <span className={mctClassName()}>Your time</span>
            <span className={mctClassName()}>
              {meanCycleTime ? meanCycleTime : "--:--:--"}
            </span>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="eff-card-v2">
        <div className="eff-card-v2__item eff-card-v2__item">
          {this.renderTactTime()}
        </div>
        <div className="eff-card-v2__item eff-card-v2__item--accent">
          {this.renderMeanCycleTime()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    existingOrder: state.scanner.existingOrder as IOrder,
    orderStats: state.scanner.orderStats,
    pnConfig: state.dashboard.partnumberConfig,
    menu: state.scanner.menu,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    _line: state.scanner.pickedLine || (localStorage.getItem("line") as string),
  };
}
export default connect(mapStateToProps, actions)(EfficiencyCard);
