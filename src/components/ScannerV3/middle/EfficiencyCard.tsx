import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  OrderStatisticsType,
  PartnumberConfigType,
  HourlyRatesType,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import { secondsToHhMmSs } from "../../../utils/secondsToHhMmSs";
import { getColor } from "../../../utils/getColor";
import { hourlyPaceToTactTime } from "../../../utils/hourlyPaceToTactTime";
import "./EfficiencyCardStyle.scss";

interface IEfficiencyCardProps {
  orderNumber?: string | null;
  _line: string;
  orderStats: OrderStatisticsType;
  pnConfig: PartnumberConfigType;
  hourlyRates: HourlyRatesType[];
}

class EfficiencyCard extends Component<IEfficiencyCardProps> {
  getTactTime() {
    const { orderStats, pnConfig } = this.props;
    const { givenHourlyRate, givenTactTime, xlsxTactTime } = orderStats;
    const { computationsBase, sourceOftruth } = pnConfig;
    const tt =
      computationsBase === "tactTime"
        ? givenTactTime
        : hourlyPaceToTactTime(givenHourlyRate);

    return sourceOftruth === "excel" ? xlsxTactTime : tt;
  }

  renderTactTime() {
    const { orderNumber } = this.props;

    if (orderNumber) {
      const tactTime = secondsToHhMmSs(this.getTactTime());
      return (
        <div className="eff-card-v3__item">
          <span>Tact time</span>
          <span>{tactTime ? tactTime : "--:--:--"}</span>
        </div>
      );
    }
  }

  renderMeanCycleTime() {
    const { orderNumber, orderStats } = this.props;
    const { meanCycleTimeInMilliseconds } = orderStats;

    if (orderNumber) {
      const mct = meanCycleTimeInMilliseconds / 1000;
      const tt = this.getTactTime();
      const meanCycleTime = secondsToHhMmSs(mct);
      const color = getColor({ givenTime: tt, actualTime: mct });

      return (
        <div className="eff-card-v3__item">
          <span className={`eff-card-v3__item--${color}`}>Your time</span>
          <span className={`eff-card-v3__item--${color}`}>
            {meanCycleTime ? meanCycleTime : "--:--:--"}
          </span>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="eff-card-v3">
        <div className="eff-card-v3__item eff-card-v3__item">
          {this.renderTactTime()}
        </div>
        <div className="eff-card-v3__item eff-card-v3__item--accent">
          {this.renderMeanCycleTime()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    orderStats: state.scanner.orderStats,
    hourlyRates: state.scanner.hourlyRates,
    pnConfig: state.dashboard.partnumberConfig,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    _line: state.scanner.pickedLine || (localStorage.getItem("line") as string),
  };
}
export default connect(mapStateToProps, actions)(EfficiencyCard);
