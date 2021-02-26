import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import RedirectionsRouter from "./Redirections/RedirectionRouter";
import "./MainStyle.scss";

class ManagementRedirections extends Component {
  handleAddUserClick = () => {};

  render() {
    return (
      <div className="main-page">
        <RedirectionsRouter />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(ManagementRedirections));
