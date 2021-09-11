import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";
import { ActionTypes } from "../../../actions/types";
import { StoreState } from "../../../reducers";
import OrdersList from "./OrdersList";
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
        return <OrdersList />;

      default:
        return <OrdersList />;
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
