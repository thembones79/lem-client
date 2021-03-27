import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import { ROOT_URL } from "../../config";
import LineStatsCard from "./LineStatsCard";
import "./AnalyticsLiveViewStyle.scss";

let socket;

class AnalyticsLiveView extends Component {
  componentDidMount() {
    this.props.initLiveData();

    socket = io(ROOT_URL, {
      query: { authorization: localStorage.getItem("token") },
      transports: ["websocket"],
    });

    socket.on("LiveView", (data) => {
      this.props.refreshLiveData(data);
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  renderLineStatsCards() {
    if (this.props.liveView) {
      const { liveView } = this.props;

      return liveView.map((item) => (
        <LineStatsCard
          key={item._id}
          lineDescription={item.lineDescription}
          orderNumber={item.orderNumber}
          orderStatus={item.orderStatus}
          partNumber={item.partNumber}
          tactTime={item.tactTime}
          meanCycleTime={item.meanCycleTime}
          lastCycleTime={item.lastCycleTime}
          efficiency={item.efficiency}
          quantity={item.quantity}
          validScans={item.validScans}
        />
      ));
    }
  }

  render() {
    return <div className="liveview-page">{this.renderLineStatsCards()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    liveView: state.dashboard.liveView,
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(AnalyticsLiveView));
