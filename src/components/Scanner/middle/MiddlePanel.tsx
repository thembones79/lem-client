import React, { Component } from "react";
import LinePicker from "./LinePicker";
import OrderInfoCard from "./OrderInfoCard";
import EfficiencyCard from "./EfficiencyCard";
import DurationTimeCard from "./DurationTimeCard";
import "./MiddlePanelStyle.scss";

class MiddlePanel extends Component {
  render() {
    return (
      <div className="middle-panel">
        <LinePicker />
        <div className="line-order-stats">
          <OrderInfoCard />
          <EfficiencyCard />
          <DurationTimeCard />
        </div>
      </div>
    );
  }
}

export default MiddlePanel;
