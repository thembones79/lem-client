import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import "./MainStyle.scss";
import AnalyticsLines from "./AnalyticsLines";
import AnalyticsOrders from "./AnalyticsOrders";
import AnalyticsLiveView from "./AnalyticsLiveView";
import ManagementCustomers from "./ManagementCustomers";
import ManagementLines from "./ManagementLines";
import ManagementOrders from "./ManagementOrders";
import ManagementTactTimes from "./ManagementTactTimes";
import ManagementUsers from "./ManagementUsers";

class Main extends Component {
  renderChildComponent(tab) {
    switch (tab) {
      case "AnalyticsLines":
        return <AnalyticsLines />;
      case "AnalyticsOrders":
        return <AnalyticsOrders />;
      case "AnalyticsLiveView":
        return <AnalyticsLiveView />;
      case "ManagementCustomers":
        return <ManagementCustomers />;
      case "ManagementLines":
        return <ManagementLines />;
      case "ManagementOrders":
        return <ManagementOrders />;
      case "ManagementTactTimes":
        return <ManagementTactTimes />;
      case "ManagementUsers":
        return <ManagementUsers />;
      default:
        return <div>Please pick a tab from the sidebar!</div>;
    }
  }

  render() {
    return <>{this.renderChildComponent(this.props.activeSidebarTab)}</>;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    activeSidebarTab: state.dashboard.activeSidebarTab,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Main));
