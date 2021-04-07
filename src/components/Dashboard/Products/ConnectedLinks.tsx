import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { by } from "../../../utils/by";
import { ProductType } from "../../../actions";
import { StoreState } from "../../../reducers";
import ConnectedLinkItem from "./ConnectedLinkItem";

interface IConnectedLinksProps {
  errorMessage?: string;
  productId?: string;
  productDetails?: ProductType;
}

class ConnectedLinks extends Component<IConnectedLinksProps> {
  renderLinksList() {
    const { productDetails } = this.props;
    if (productDetails && productDetails.linksToDocs) {
      return productDetails.linksToDocs
        .sort(by("description"))
        .map((link) => (
          <ConnectedLinkItem
            key={link._id}
            _id={link._id}
            description={link.description}
            url={link.url}
            fileName={link.fileName}
            details={productDetails}
          />
        ));
    }
  }

  render() {
    return (
      <div className="">
        <div className="links-list__header">
          <span className="links-list__header__item">
            normal documents (for single product)
          </span>
        </div>
        <div className="links-list">{this.renderLinksList()}</div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  const { errorMessage, productId, productDetails } = state.wids;
  return {
    errorMessage,
    productId,
    productDetails,
    enableReinitialize: true,
  };
}

export default connect(mapStateToProps, actions)(ConnectedLinks);
