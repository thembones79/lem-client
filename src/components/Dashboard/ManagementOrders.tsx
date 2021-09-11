import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import { StoreState } from "../../reducers";
import OrderRouter from "./Orders/OrderRouter";
import "./MainStyle.scss";

interface IManagementOrdersProps {
  OrderRouter: React.ElementType;
}

class ManagementOrders extends Component<IManagementOrdersProps> {
  render() {
    const { OrderRouter } = this.props;
    return (
      <div className="main-page">
        <OrderRouter />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
    OrderRouter,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(ManagementOrders));
