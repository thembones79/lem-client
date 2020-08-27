import React, { Component } from "react";
import LinePicker from "./LinePicker";
import OrderInfoCard from "./OrderInfoCard";

class MiddlePanel extends Component {
  render() {
    return (
      <div>
        <LinePicker />
        <OrderInfoCard />
      </div>
    );
  }
}

export default MiddlePanel;
