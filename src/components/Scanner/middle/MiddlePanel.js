import React, { Component } from "react";
import LinePicker from "./LinePicker";
import OrderInfoCard from "./OrderInfoCard";
import EfficiencyCard from "./EfficiencyCard";
import DurationTimeCard from "./DurationTimeCard";

class MiddlePanel extends Component {
  render() {
    return (
      <div>
        <LinePicker />
        <OrderInfoCard />
        <EfficiencyCard />
        <DurationTimeCard />
      </div>
    );
  }
}

export default MiddlePanel;
