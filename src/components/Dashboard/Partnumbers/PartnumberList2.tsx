import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { PartnumberListType, PartnumberConfigType } from "../../../actions";
import { StoreState } from "../../../reducers";
import { by } from "../../../utils/by";
import PartnumberItem from "./PartnumberItem";
import "../Products/ProductsListStyle.scss";

interface IPartnumbersListProps {
  partnumbers?: PartnumberListType[];
  partnumberConfig: PartnumberConfigType;
  filteredPartnumbers?: PartnumberListType[];
  getPartnumbers: () => void;
  getPartnumberConfig: () => void;
  updatePartnumbersList: (filteredPartnumbers: PartnumberListType[]) => void;
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
    const filteredPartnumbers: PartnumberListType[] =
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
          />
        ));
    }
  }

  render() {
    const { partnumberConfig } = this.props;
    return (
      <div className="product-page">
        <div className="product-page__header">
          <div className="products-list__filter">
            <label className="products-list__filter__label">filter</label>
            <input
              className="products-list__filter__input"
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
            // onClick={this.props.startAddingPartnumber}
          >
            NEW PRODUCT2
          </button>
        </div>
        <div className="products-list__header">
          <span className="products-list__header__item--first">product</span>
        </div>
        <div className="products-list">{this.renderPartnumbersList()}</div>
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
