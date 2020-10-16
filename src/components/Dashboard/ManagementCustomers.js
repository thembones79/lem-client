import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import "./MainStyle.scss";

class ManagementCustomers extends Component {
  handleAddUserClick = () => {};

  render() {
    return (
      <div className="main-page">
        <button className="btn btn--accent" onClick={this.handleAddUserClick}>
          ManagementCustomers
        </button>
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
)(requireAuth(ManagementCustomers));