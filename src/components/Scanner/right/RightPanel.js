import React, { Component } from "react";
import OrderPicker from "./OrderPicker";
import OrderButtons from "./OrderButtons";
import MissingScans from "./MissingScans";

class RightPanel extends Component {
  render() {
    return (
      <div>
        <OrderPicker />
        <MissingScans />
        <OrderButtons />
      </div>
    );
  }
}

export default RightPanel;
