import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import LinePicker from "./LinePicker";
import OrderInfoCard from "./OrderInfoCard";
import EfficiencyCard from "./EfficiencyCard";
import DurationTimeCard from "./DurationTimeCard";
import "./MiddlePanelStyle.scss";

interface IMiddlePanelProps {
  LinePicker: ElementType;
  OrderInfoCard: ElementType;
  EfficiencyCard: ElementType;
  DurationTimeCard: ElementType;
}

class MiddlePanel extends Component<IMiddlePanelProps> {
  render() {
    const {
      LinePicker,
      OrderInfoCard,
      EfficiencyCard,
      DurationTimeCard,
    } = this.props;
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

function mapStateToProps(state: StoreState) {
  return {
    LinePicker,
    OrderInfoCard,
    EfficiencyCard,
    DurationTimeCard,
  };
}

export default connect(mapStateToProps)(MiddlePanel);
