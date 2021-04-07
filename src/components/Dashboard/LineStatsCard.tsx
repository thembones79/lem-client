import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import { StoreState } from "../../reducers";
import "./LineStatsCardStyle.scss";

interface ILineStatsCardProps {
  authenticated: string | null;
  lineDescription: string;
  orderNumber: string;
  orderStatus: string;
  partNumber: string;
  validScans: number;
  quantity: number;
  tactTime: number;
  meanCycleTime: number;
  lastCycleTime: number;
  efficiency: number;
}

class LineStatsCard extends Component<ILineStatsCardProps> {
  render() {
    return (
      <div className="line-stats-card">
        <div className="line-stats-card__header">
          LINE - {this.props.lineDescription}
        </div>
        <div className="line-stats-card__row">
          <span className="line-stats-card__item line-stats-card__item--bold">
            {this.props.orderNumber}
          </span>
          <span className="line-stats-card__item line-stats-card__item--accent">
            {this.props.orderStatus}
          </span>
        </div>
        <div className="line-stats-card__row line-stats-card__row--smaller">
          <span className="line-stats-card__item">{this.props.partNumber}</span>
          <span className="line-stats-card__item line-stats-card__item--bold">
            {this.props.validScans} / {this.props.quantity}
          </span>
        </div>

        <div className="line-stats-card__row line-stats-card__row--accent">
          <span className="line-stats-card__item">TT</span>
          <span className="line-stats-card__item">{this.props.tactTime}</span>
        </div>

        <div className="line-stats-card__row line-stats-card__row--accent">
          <span className="line-stats-card__item">MCT</span>
          <span className="line-stats-card__item">
            {this.props.meanCycleTime}
          </span>
        </div>
        <div className="line-stats-card__row line-stats-card__row--accent">
          <span className="line-stats-card__item">LCT</span>
          <span className="line-stats-card__item">
            {this.props.lastCycleTime}
          </span>
        </div>

        <div className="line-stats-card__row line-stats-card__row--smaller">
          <span className="line-stats-card__item  line-stats-card__item--bold">
            efficiency
          </span>
          <span className="line-stats-card__item  line-stats-card__item--bold">
            {this.props.efficiency}%
          </span>
        </div>
        <div className="line-stats-card__row line-stats-card__row--smaller">
          <span className="line-stats-card__item">availability</span>
          <span className="line-stats-card__item">TO DO!!! %</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(LineStatsCard));
