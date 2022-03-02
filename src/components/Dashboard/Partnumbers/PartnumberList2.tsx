import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { PartnumberType, PartnumberConfigType } from "../../../actions";
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
  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    console.log({ propsy: this.props });
    const { partnumberConfig, isLoading, errorMessage } = this.props;

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
          <div>
            {partnumberConfig.computationsBase} {partnumberConfig.sourceOftruth}
          </div>
          <button
            className="btn btn--accent "
            onClick={this.props.configurePartnumbers}
          >
            NEW PRODUCT2
          </button>
        </div>
        <div className="partnumber-list__header">
          <span className="partnumber-list__header__item--first">product</span>
          <span className="partnumber-list__header__item">givenTactTime</span>
          <span className="partnumber-list__header__item">
            suggestedTactTime
          </span>
          <span className="partnumber-list__header__item">givenHourlyPace</span>
          <span className="partnumber-list__header__item">
            suggestedHourlyPace
          </span>
          <span className="partnumber-list__header__item">xlsxTactTime</span>
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
