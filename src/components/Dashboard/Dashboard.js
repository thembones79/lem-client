import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import "./DashboardStyle.scss";

class Dashboard extends Component {
  handleAddUserClick = () => {
    this.props.history.push("/adduser");
  };

  render() {
    return (
      <div className="dashboard-page">
        <button className="btn btn--accent" onClick={this.handleAddUserClick}>
          Add new user
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

export default connect(mapStateToProps, actions)(requireAuth(Dashboard));
