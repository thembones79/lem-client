import React, { Component } from "react";
import OrderPicker from "./OrderPicker";
import OrderButtons from "./OrderButtons";
import MissingScans from "./MissingScans";
import DoneTodoCard from "./DoneTodoCard";
import "./RightPanelStyle.scss";

class RightPanel extends Component {
  render() {
    return (
      <div className="right-panel">
        <OrderPicker />
        <MissingScans />
        <DoneTodoCard />
        <OrderButtons />
      </div>
    );
  }
}

export default RightPanel;
