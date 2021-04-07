import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import OrderPicker from "./OrderPicker";
import OrderButtons from "./OrderButtons";
import MissingScans from "./MissingScans";
import DoneTodoCard from "./DoneTodoCard";
import "./RightPanelStyle.scss";

interface IRightPanelProps {
  OrderPicker: ElementType;
  MissingScans: ElementType;
  DoneTodoCard: ElementType;
  OrderButtons: ElementType;
}

class RightPanel extends Component<IRightPanelProps> {
  render() {
    const {
      OrderPicker,
      MissingScans,
      DoneTodoCard,
      OrderButtons,
    } = this.props;
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

function mapStateToProps(state: StoreState) {
  return {
    OrderPicker,
    MissingScans,
    DoneTodoCard,
    OrderButtons,
  };
}

export default connect(mapStateToProps)(RightPanel);
