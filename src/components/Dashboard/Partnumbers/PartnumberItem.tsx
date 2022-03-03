import React, { Component } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import * as actions from "../../../actions";
import {
  PartnumberType,
  PartnumberConfigType,
  ComputationsBase,
} from "../../../actions";
import "./PartnumberItemStyle.scss";

interface IPartnumberItemProps extends PartnumberType {
  startEditingPartnumber: (Partnumber: PartnumberType) => void;
  partnumberConfig: PartnumberConfigType;
}

class PartnumberItem extends Component<IPartnumberItemProps> {
  renderConditionalColumns() {
    const {
      partnumberConfig,
      givenHourlyRate,
      givenTactTime,
      suggestedHourlyRate,
      suggestedTactTime,
    } = this.props;
    const { computationsBase } = partnumberConfig;
    if (computationsBase === ComputationsBase.tactTime) {
      return (
        <>
          <span className="partnumber-row__item">{givenTactTime}</span>
          <span className="partnumber-row__item">{suggestedTactTime}</span>
        </>
      );
    }

    if (computationsBase === ComputationsBase.hourlyRate) {
      return (
        <>
          <span className="partnumber-row__item">{givenHourlyRate}</span>
          <span className="partnumber-row__item">{suggestedHourlyRate}</span>
        </>
      );
    }
  }

  render() {
    const {
      partNumber,
      _id,
      givenHourlyRate,
      givenTactTime,
      suggestedHourlyRate,
      suggestedTactTime,
      xlsxTactTime,
      startEditingPartnumber,
      automatic,
    } = this.props;

    return (
      <div className="partnumber-row">
        <div className="partnumber-row__items">
          <span className="partnumber-row__item--first">{partNumber}</span>
          {this.renderConditionalColumns()}

          <span className="partnumber-row__item">{xlsxTactTime}</span>
        </div>

        <div className="partnumber-row__buttons">
          <button
            className="btn btn--finish btn--thin"
            onClick={() => {
              startEditingPartnumber({
                partNumber,
                _id,
                givenHourlyRate,
                givenTactTime,
                suggestedHourlyRate,
                suggestedTactTime,
                xlsxTactTime,
                automatic,
              });
            }}
          >
            EDIT
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  const { partnumberConfig } = state.dashboard;
  return {
    partnumberConfig,
  };
}

export default connect(mapStateToProps, actions)(PartnumberItem);
