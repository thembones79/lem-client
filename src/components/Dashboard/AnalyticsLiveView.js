import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import { ROOT_URL } from "../../config";
import "./MainStyle.scss";

let socket;

class AnalyticsLiveView extends Component {
  handleAddUserClick = () => {};

  componentDidMount() {
    socket = io(ROOT_URL, {
      query: { authorization: localStorage.getItem("token") },
    });
    socket.on("FromAPI", (data) => {
      console.log({ fromapi: data });
    });

    socket.on("LiveView", (data) => {
      console.log({ liveview: data });
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  render() {
    return (
      <div className="main-page">
        <button className="btn btn--accent" onClick={this.handleAddUserClick}>
          AnalyticsLiveView
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
)(requireAuth(AnalyticsLiveView));
