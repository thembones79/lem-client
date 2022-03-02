import React, { Component } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import * as actions from "../../../actions";
import { PartnumberType } from "../../../actions";
import "./PartnumberItemStyle.scss";

interface IPartnumberItemProps extends PartnumberType {
  startEditingPartnumber: (Partnumber: PartnumberType) => void;
}

class PartnumberItem extends Component<IPartnumberItemProps> {
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
          <span className="partnumber-row__item">{givenTactTime}</span>
          <span className="partnumber-row__item">{suggestedTactTime}</span>
          <span className="partnumber-row__item">{givenHourlyRate}</span>
          <span className="partnumber-row__item">{suggestedHourlyRate}</span>
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
