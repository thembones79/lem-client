import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { StoreState } from "../../reducers";
import requireAuth from "../requireAuth";
import "./MainStyle.scss";

class AnalyticsLines extends Component {
  handleAddUserClick = () => {
    alert("AnalyticsLines");
  };

  render() {
    return (
      <div className="main-page">
        <button className="btn btn--accent" onClick={this.handleAddUserClick}>
          AnalyticsLines
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

export default connect(mapStateToProps, actions)(requireAuth(AnalyticsLines));
