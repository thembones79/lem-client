import React, { Component } from "react";
import { HourlyRatesType } from "../../../actions";
import HourlyRatesRow from "./HourlyRatesRow";
import "./HourlyRatesStyle.scss";

interface IHourlyRatesProps {
  hourlyRates: HourlyRatesType[];
}

class HourlyRates extends Component<IHourlyRatesProps> {
  renderHourlyRates() {
    const { hourlyRates } = this.props;
    return hourlyRates.map((hourlyRate, i) => (
      <HourlyRatesRow hourlyRate={hourlyRate} key={i} />
    ));
  }
  render() {
    return (
      <table className="hourly-rates">
        <tbody>{this.renderHourlyRates()}</tbody>
      </table>
    );
  }
}

export default HourlyRates;
