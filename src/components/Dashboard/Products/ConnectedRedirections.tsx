import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { ProductType } from "../../../actions";
import { StoreState } from "../../../reducers";
import { by } from "../../../utils/by";
import ConnectedRedirectionItem from "./ConnectedRedirectionItem";

interface IConnectedRedirectionsProps {
  productDetails?: ProductType;
}

class ConnectedRedirections extends Component<IConnectedRedirectionsProps, {}> {
  renderRedirsList() {
    const { productDetails } = this.props;
    if (productDetails && productDetails.linksToRedirs) {
      return productDetails.linksToRedirs
        .sort(by("description"))
        .map((redir) => (
          <ConnectedRedirectionItem
            key={redir._id}
            _id={redir._id}
            description={redir.description}
            redirRoute={redir.redirRoute}
            targetUrl={redir.targetUrl}
            fileName={redir.fileName}
            details={productDetails}
          />
        ));
    }
  }

  render() {
    return (
      <div className="">
        <div className="links-list__header">
          <span className="links-list__header__item--first">
            universal documents (for many products)
          </span>
        </div>
        <div className="links-list">{this.renderRedirsList()}</div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  const { productDetails } = state.wids;
  return {
    productDetails,
    enableReinitialize: true,
  };
}

export default connect(mapStateToProps, actions)(ConnectedRedirections);
