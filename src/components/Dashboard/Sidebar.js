import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import SidebarTab from "./SidebarTab";
import "./SidebarStyle.scss";
import LineIcon from "../icons/LineIcon";
import UserIcon from "../icons/UserIcon";
import OrderIcon from "../icons/OrderIcon";
import TimesIcon from "../icons/TimesIcon";
import ManagementIcon from "../icons/ManagementIcon";
import CustomerIcon from "../icons/CustomerIcon";
import AnalyticsIcon from "../icons/AnalyticsIcon";
import LiveViewIcon from "../icons/LiveViewIcon";

class Sidebar extends Component {
  state = { activeSidebarTab: "ordersiki" };

  render() {
    return (
      <div className="sidebar">
        <div>
          <div className="sidebar__group">
            <div className="sidebar__tab__icon">
              <ManagementIcon />{" "}
            </div>
            <div className="sidebar__tab__text">management </div>
          </div>
          <div>
            <SidebarTab tab="ManagementOrders" text="orders">
              <OrderIcon />
            </SidebarTab>
            <SidebarTab tab="ManagementLines" text="lines">
              <LineIcon />
            </SidebarTab>
            <SidebarTab tab="ManagementTactTimes" text="tact times">
              <TimesIcon />
            </SidebarTab>
            <SidebarTab tab="ManagementUsers" text="users">
              <UserIcon />
            </SidebarTab>
            <SidebarTab tab="ManagementCustomers" text="customers">
              <CustomerIcon />
            </SidebarTab>
          </div>
        </div>
        <div>
          <div className="sidebar__group">
            <div className="sidebar__tab__icon">
              {" "}
              <AnalyticsIcon />{" "}
            </div>
            <div className="sidebar__tab__text">analytics </div>
          </div>
          <div>
            <SidebarTab tab="AnalyticsOrders" text="orders">
              <OrderIcon />
            </SidebarTab>
            <SidebarTab tab="AnalyticsLines" text="lines">
              <LineIcon />
            </SidebarTab>
            <SidebarTab tab="AnalyticsLiveView" text="live view">
              <LiveViewIcon />
            </SidebarTab>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    activeSidebarTab: state.dashboard.activeSidebarTab,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Sidebar));
