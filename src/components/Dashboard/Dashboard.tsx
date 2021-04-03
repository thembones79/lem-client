import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import requireManager from "../requireManager";
import MainPage from "./Main";
import Sidebar from "./Sidebar";
import { StoreState } from "../../reducers";
import "./DashboardStyle.scss";

class Dashboard extends Component {
  render() {
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
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(requireManager(Dashboard)));
