import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import { StoreState } from "../../reducers";
import "./MainStyle.scss";

class AnalyticsOrders extends Component {
  handleAddUserClick = () => {};

  render() {
    return (
      <div className="main-page">
        <button className="btn btn--accent" onClick={this.handleAddUserClick}>
          AnalyticsOrders
        </button>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(AnalyticsOrders));
