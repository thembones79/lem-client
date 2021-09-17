import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";
import { ActionTypes } from "../../../actions/types";
import { StoreState } from "../../../reducers";
import OrdersList2 from "./OrdersList2";
import OrderDetails from "./OrderDetails";

interface IOrderRouterProps {
  activeOrderComponent: ActionTypes;
}

class OrderRouter extends Component<IOrderRouterProps> {
  renderOrderComponent(activeComponent: ActionTypes) {
    switch (activeComponent) {
      case ActionTypes.VIEW:
        return <OrderDetails />;
      case ActionTypes.LIST:
        return <OrdersList2 />;

      default:
        return <OrdersList2 />;
    }
  }

  render() {
    return <>{this.renderOrderComponent(this.props.activeOrderComponent)}</>;
  }
}

function mapStateToProps(state: StoreState) {
  return {
    activeOrderComponent: state.dashboard.activeOrderComponent,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(OrderRouter));
