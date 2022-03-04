import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  PartnumberType,
  PartnumberConfigType,
  ComputationsBase,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import Loader from "../../Loader";
import { by } from "../../../utils/by";
import PartnumberItem from "./PartnumberItem";
import "./PartnumberListStyle.scss";

interface IPartnumbersListProps {
  partnumbers?: PartnumberType[];
  partnumberConfig: PartnumberConfigType;
  filteredPartnumbers?: PartnumberType[];
  getPartnumbers: () => void;
  getPartnumberConfig: () => void;
  configurePartnumbers: () => void;
  updatePartnumbersList: (filteredPartnumbers: PartnumberType[]) => void;
  //startAddingPartnumber: () => void;
  errorMessage: string;
  isLoading: boolean;
}

class PartnumbersList2 extends Component<IPartnumbersListProps> {
  async componentDidMount() {
    await this.props.getPartnumberConfig();
    await this.props.getPartnumbers();
    await this.filterPartnumbers();
  }

  filterPartnumbers(e?: React.FormEvent<HTMLInputElement>) {
    const text = e ? e.currentTarget.value : "";
    const filteredPartnumbers: PartnumberType[] =
      this.getFilteredPartnumbersForText(text);
    this.props.updatePartnumbersList(filteredPartnumbers);
  }

  getFilteredPartnumbersForText(text: string) {
    if (this.props.partnumbers) {
      return this.props.partnumbers.filter((product) => {
        if (product && product.partNumber) {
          return product.partNumber.toLowerCase().includes(text.toLowerCase());
        } else {
          return false;
        }
      });
    } else {
      return [];
    }
  }

  renderPartnumbersList() {
    const { filteredPartnumbers } = this.props;

    if (filteredPartnumbers) {
      return filteredPartnumbers
        .sort(by("partNumber"))
        .map((product) => (
          <PartnumberItem
            key={product._id}
            _id={product._id}
            partNumber={product.partNumber}
            givenTactTime={product.givenTactTime}
            suggestedTactTime={product.suggestedTactTime}
            givenHourlyRate={product.givenHourlyRate}
            suggestedHourlyRate={product.suggestedHourlyRate}
            xlsxTactTime={product.xlsxTactTime}
            automatic={product.automatic}
          />
        ));
    }
  }

  renderConditionalHeaders() {
    const { partnumberConfig } = this.props;
    const { computationsBase } = partnumberConfig;
    if (computationsBase === ComputationsBase.tactTime) {
      return (
        <>
          <span className="partnumber-list__header__item">given tt</span>
          <span className="partnumber-list__header__item">suggested tt</span>
          <span className="partnumber-list__header__item">computed pace</span>
        </>
      );
    }

    if (computationsBase === ComputationsBase.hourlyRate) {
      return (
        <>
          <span className="partnumber-list__header__item">given pace</span>
          <span className="partnumber-list__header__item">suggested pace</span>
          <span className="partnumber-list__header__item">computed tt</span>
        </>
      );
    }
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { partnumberConfig, isLoading, errorMessage, filteredPartnumbers } =
      this.props;
    if (errorMessage) {
      return <div className="alert">{this.renderAlert()}</div>;
    }
    if (isLoading) {
      return <Loader />;
    }
    return (
      <div className="partnumber-page">
        <div className="partnumber-page__header">
          <div className="partnumber-list__filter">
            <label className="partnumber-list__filter__label">filter</label>
            <input
              className="partnumber-list__filter__input"
              placeholder="search..."
              onChange={(e) => {
                this.filterPartnumbers(e);
              }}
            />
          </div>
          <div>Count: {filteredPartnumbers?.length}</div>
          <div>
            {partnumberConfig.computationsBase} {partnumberConfig.sourceOftruth}
          </div>
          <button
            className="btn btn--accent "
            onClick={this.props.configurePartnumbers}
          >
            CONFIGURE
          </button>
        </div>
        <div className="partnumber-list__header">
          <span className="partnumber-list__header__item--first">product</span>
          {this.renderConditionalHeaders()}
          <span className="partnumber-list__header__item">excel tt</span>
        </div>
        <div className="partnumber-list">{this.renderPartnumbersList()}</div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  const {
    filteredPartnumbers,
    partnumbers,
    isLoading,
    errorMessage,
    partnumberConfig,
  } = state.dashboard;
  return {
    filteredPartnumbers,
    partnumbers,
    isLoading,
    errorMessage,
    partnumberConfig,
  };
}

export default connect(mapStateToProps, actions)(PartnumbersList2);
