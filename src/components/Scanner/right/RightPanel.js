import React, { Component } from "react";
import OrderPicker from "./OrderPicker";
import OrderButtons from "./OrderButtons";

class RightPanel extends Component {
  render() {
    return (
      <div>
        <OrderPicker />
        <OrderButtons />
      </div>
    );
  }
}

export default RightPanel;
