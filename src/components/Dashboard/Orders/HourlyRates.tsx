import React, { Component } from "react";
import { HourlyRatesType } from "../../../actions";
import ScanDetails from "./ScanDetails";

interface IHourlyRatesProps {
  hourlyRates: HourlyRatesType[];
}

class HourlyRates extends Component<IHourlyRatesProps> {
  render() {
    const { hourlyRates } = this.props;
    return hourlyRates.map((x) => (
      <tr key={x.dateHour}>
        <td>{x.dateHour}</td>
        <ScanDetails scanDetails={x.scanDetails} />
      </tr>
    ));
  }
}

export default HourlyRates;
