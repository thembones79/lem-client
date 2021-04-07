import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import RedirectionsRouter from "./Redirections/RedirectionRouter";
import { StoreState } from "../../reducers";
import "./MainStyle.scss";

interface IManagementRedirectionsProps {
  RedirectionsRouter: React.ElementType;
}

class ManagementRedirections extends Component<IManagementRedirectionsProps> {
  render() {
    const { RedirectionsRouter } = this.props;
    return (
      <div className="main-page">
        <RedirectionsRouter />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
    RedirectionsRouter,
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(ManagementRedirections)) as ElementType;
