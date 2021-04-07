import React, { Component } from "react";
import { connect } from "react-redux";
import io, { Socket } from "socket.io-client";
import * as actions from "../../actions";
import {
  OrderStatsType,
  IRefreshLiveData,
  initLiveData,
  refreshLiveData,
} from "../../actions";
import requireAuth from "../requireAuth";
import { ROOT_URL } from "../../config";
import LineStatsCard from "./LineStatsCard";
import "./AnalyticsLiveViewStyle.scss";
import { StoreState } from "../../reducers";

let socket: typeof Socket;

interface IAnalyticsLiveViewProps {
  authenticated: string | null;
  liveView: OrderStatsType[];
  initLiveData: typeof initLiveData;
  refreshLiveData: typeof refreshLiveData;
  LineStatsCard: React.ElementType;
}

class AnalyticsLiveView extends Component<IAnalyticsLiveViewProps> {
  componentDidMount() {
    this.props.initLiveData();

    socket = io(ROOT_URL, {
      query: { authorization: localStorage.getItem("token") },
      transports: ["websocket"],
    });

    socket.on("LiveView", (data: IRefreshLiveData) => {
      this.props.refreshLiveData(data);
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  renderLineStatsCards() {
    if (this.props.liveView) {
      const { liveView, LineStatsCard } = this.props;

      return liveView.map((item) => {
        const key = item._id;
        const lineStatsCardProps = { ...item, key };
        return <LineStatsCard {...lineStatsCardProps} />;
      });
    }
  }

  render() {
    return <div className="liveview-page">{this.renderLineStatsCards()}</div>;
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
    liveView: state.dashboard.liveView,
    LineStatsCard,
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(AnalyticsLiveView));
