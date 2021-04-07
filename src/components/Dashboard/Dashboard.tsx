import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import requireManager from "../requireManager";
import MainPage from "./Main";
import Sidebar from "./Sidebar";
import { StoreState } from "../../reducers";
import "./DashboardStyle.scss";

interface IDashboardProps {
  Sidebar: React.ElementType;
  MainPage: React.ElementType;
}

class Dashboard extends Component<IDashboardProps> {
  render() {
    const { Sidebar, MainPage } = this.props;
    return (
      <div className="dashboard-page">
        <Sidebar />
        <MainPage />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
    Sidebar,
    MainPage,
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(requireManager(Dashboard)));
