import React, { Component } from "react";
import { HourlyRatesType } from "../../../actions";
import ScanDetails from "./ScanDetails";
import "./HourlyRatesStyle.scss";

interface IHourlyRateProps {
  hourlyRate: HourlyRatesType;
}

class HourlyRatesRow extends Component<IHourlyRateProps> {
  state = {
    expanded: false,
  };

  render() {
    const { hourlyRate } = this.props;
    const { dateHour, scanDetails } = hourlyRate;
    return (
      <tr
        onClick={() => this.setState({ expanded: !this.state.expanded })}
        className="hourly-rates__row"
      >
        <td>{dateHour}</td>
        <ScanDetails scanDetails={scanDetails} expanded={this.state.expanded} />
      </tr>
    );
  }
}

export default HourlyRatesRow;
