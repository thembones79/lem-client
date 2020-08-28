import React, { Component } from "react";
import LinePicker from "./LinePicker";
import OrderInfoCard from "./OrderInfoCard";
import EfficiencyCard from "./EfficiencyCard";

class MiddlePanel extends Component {
  render() {
    return (
      <div>
        <LinePicker />
        <OrderInfoCard />
        <EfficiencyCard />
      </div>
    );
  }
}

export default MiddlePanel;
