import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  OrderStatisticsType,
  PartnumberConfigType,
  HourlyRatesType,
  LineType,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import Bar from "./Bar";
import { tactTimeToHourlyPace } from "../../../utils/tactTimeToHourlyPace";
import { hourlyPaceToTactTime } from "../../../utils/hourlyPaceToTactTime";
import { getColor } from "../../../utils/getColor";
import "./GameStyle.scss";

interface IGameProps {
  orderNumber?: string | null;
  _line: string;
  lines: LineType[];
  orderStats: OrderStatisticsType;
  pnConfig: PartnumberConfigType;
  hourlyRates: HourlyRatesType[];
}

class Game extends Component<IGameProps> {
  getLineDescription() {
    const { lines, _line } = this.props;
    return lines.filter((line) => line._id === _line)[0].lineDescription;
  }

  getHour(timestring: string) {
    const len = timestring.length;
    return timestring.substring(len - 2, len);
  }

  getScanSumFromLine(hourlyRate: HourlyRatesType) {
    const { scanDetails } = hourlyRate;

    return (
      scanDetails.filter((x) => x.scansLine === this.getLineDescription())[0]
        ?.scansSum || 0
    );
  }

  getStatsFromLastThreeHours() {
    const { hourlyRates } = this.props;
    const lastThree = hourlyRates?.slice(-3);
    return lastThree?.map((x) => {
      return {
        hour: this.getHour(x.dateHour),
        sum: this.getScanSumFromLine(x),
      };
    });
  }

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

  getPace() {
    const { orderStats, pnConfig } = this.props;
    const { givenHourlyRate, givenTactTime, xlsxTactTime } = orderStats;
    const { computationsBase, sourceOftruth } = pnConfig;
    const pace =
      computationsBase === "tactTime"
        ? tactTimeToHourlyPace(givenTactTime)
        : givenHourlyRate;

    return sourceOftruth === "excel"
      ? tactTimeToHourlyPace(xlsxTactTime)
      : pace;
  }

  renderGameBlocks() {
    const gamePace = this.getPace();
    const stats = this.getStatsFromLastThreeHours();
    const paces = stats.map((x) => x.sum);
    const max = Math.max(gamePace, ...paces);

    return stats.map((x, i) => (
      <div key={i} className={`game__block ${i % 2 && "game__block--darken"}`}>
        <div className="game__charts">
          <div className="game__chart">
            <div className="game__pace">{gamePace}</div>
            <Bar max={max} value={gamePace} />
          </div>
          <div className="game__chart game__chart--active">
            <div className="game__pace--active">{x.sum}</div>
            <Bar max={max} value={x.sum} active />
          </div>
        </div>
        <div className="game__hour">{x.hour}:00</div>
      </div>
    ));
  }

  render() {
    const { orderStats } = this.props;
    const { meanCycleTimeInMilliseconds } = orderStats;
    const mct = meanCycleTimeInMilliseconds / 1000;
    const tt = this.getTactTime();
    const color = getColor({ givenTime: tt, actualTime: mct });

    return (
      <div className={`game game--${color}`}>{this.renderGameBlocks()}</div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    orderStats: state.scanner.orderStats,
    hourlyRates: state.scanner.hourlyRates,
    pnConfig: state.dashboard.partnumberConfig,
    lines: state.scanner.lines,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    _line: state.scanner.pickedLine || (localStorage.getItem("line") as string),
  };
}
export default connect(mapStateToProps, actions)(Game);
