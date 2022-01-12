import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import { StoreState } from "../../reducers";
import PartnumberRouter from "./Partnumbers/PartnumberRouter";
import "./MainStyle.scss";

interface IManagementPartnumbersProps {
  PartnumberRouter: React.ElementType;
}

class AnalyticsPartnumbers extends Component<IManagementPartnumbersProps> {
  render() {
    const { PartnumberRouter } = this.props;
    return (
      <div className="main-page">
        <PartnumberRouter />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
    PartnumberRouter,
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(AnalyticsPartnumbers));
