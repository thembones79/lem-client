import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Tab } from "../../actions";
import { StoreState } from "../../reducers";
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
import ProductIcon from "../icons/ProductIcon";
import RedirectionIcon from "../icons/RedirectionIcon";

interface ISidebarProps {
  authenticated: string | null;
  activeSidebarTab: Tab;
  SidebarTab: React.ElementType;
}

class Sidebar extends Component<ISidebarProps> {
  render() {
    const { SidebarTab } = this.props;
    return (
      <div className="sidebar">
        <div>
          <div className="sidebar__group">
            <div className="sidebar__tab__icon">
              <ManagementIcon />
            </div>
            <div className="sidebar__tab__text">management </div>
          </div>
          <div>
            <SidebarTab tab={Tab.ManagementOrders} text="orders">
              <OrderIcon />
            </SidebarTab>
            <SidebarTab tab={Tab.ManagementLines} text="lines">
              <LineIcon />
            </SidebarTab>
            <SidebarTab tab={Tab.ManagementTactTimes} text="tact times">
              <TimesIcon />
            </SidebarTab>
            <SidebarTab tab={Tab.ManagementUsers} text="users">
              <UserIcon />
            </SidebarTab>
            <SidebarTab tab={Tab.ManagementCustomers} text="customers">
              <CustomerIcon />
            </SidebarTab>
            <SidebarTab tab={Tab.ManagementProducts} text="products">
              <ProductIcon />
            </SidebarTab>
            <SidebarTab tab={Tab.ManagementRedirections} text="redirections">
              <RedirectionIcon />
            </SidebarTab>
          </div>
        </div>
        <div>
          <div className="sidebar__group">
            <div className="sidebar__tab__icon">
              <AnalyticsIcon />
            </div>
            <div className="sidebar__tab__text">analytics </div>
          </div>
          <div>
            <SidebarTab tab={Tab.AnalyticsOrders} text="orders">
              <OrderIcon />
            </SidebarTab>
            <SidebarTab tab={Tab.AnalyticsLines} text="lines">
              <LineIcon />
            </SidebarTab>
            <SidebarTab tab={Tab.AnalyticsLiveView} text="live view">
              <LiveViewIcon />
            </SidebarTab>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
    activeSidebarTab: state.dashboard.activeSidebarTab,
    SidebarTab,
    OrderIcon,
    LineIcon,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Sidebar));
