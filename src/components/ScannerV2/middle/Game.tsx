import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  MenuDataType,
  OrderStatisticsType,
  PartnumberConfigType,
  HourlyRatesType,
  LineType,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import Bar from "./Bar";
import { IOrder } from "../../../utils/calculations";
import { hourlyPaceToTactTime } from "../../../utils/hourlyPaceToTactTime";
import { tactTimeToHourlyPace } from "../../../utils/tactTimeToHourlyPace";
import "./GameStyle.scss";

interface IGameProps {
  orderNumber?: string | null;
  _line: string;
  lines: LineType[];
  existingOrder: IOrder;
  orderStats: OrderStatisticsType;
  pnConfig: PartnumberConfigType;
  hourlyRates: HourlyRatesType[];
  menu: MenuDataType;
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
    return scanDetails.filter(
      (x) => x.scansLine === this.getLineDescription()
    )[0].scansSum;
  }

  getStatsFromLastThreeHours() {
    const { hourlyRates } = this.props;
    const lastThree = hourlyRates.slice(-3);
    return lastThree.map((x) => {
      return {
        hour: this.getHour(x.dateHour),
        sum: this.getScanSumFromLine(x),
      };
    });
  }

  renderGameBlocks() {
    const { orderStats, pnConfig } = this.props;
    const { givenHourlyRate, givenTactTime } = orderStats;
    const { computationsBase } = pnConfig;
    const gamePace =
      computationsBase === "tactTime"
        ? tactTimeToHourlyPace(givenTactTime)
        : givenHourlyRate;

    return this.getStatsFromLastThreeHours().map((x, i) => (
      <div key={i} className={`game__block ${i % 2 && "game__block--darken"}`}>
        <div className="game__charts">
          <div className="game__chart">
            <div className="game__pace">{gamePace}</div>
            <Bar />
          </div>
          <div className="game__chart game__chart--active">
            <div className="game__pace--active">{x.sum}</div>
            <Bar active />
          </div>
        </div>
        <div className="game__hour">{x.hour}:00</div>
      </div>
    ));
  }

  render() {
    console.log({ propsy: this.props });

    return <div className="game">{this.renderGameBlocks()}</div>;
  }
}

function mapStateToProps(state: StoreState) {
  return {
    existingOrder: state.scanner.existingOrder as IOrder,
    orderStats: state.scanner.orderStats,
    hourlyRates: state.scanner.hourlyRates,
    pnConfig: state.dashboard.partnumberConfig,
    menu: state.scanner.menu,
    lines: state.scanner.lines,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    _line: state.scanner.pickedLine || (localStorage.getItem("line") as string),
  };
}
export default connect(mapStateToProps, actions)(Game);
