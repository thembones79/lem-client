import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import ConnectedRedirectionItem from "./ConnectedRedirectionItem";

class ConnectedRedirections extends Component {
  renderRedirsList() {
    const { productDetails } = this.props;
    if (productDetails && productDetails.linksToRedirs) {
      return productDetails.linksToRedirs.map((redir) => (
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

function mapStateToProps(state) {
  const { errorMessage, productId, productDetails } = state.wids;
  return {
    errorMessage,
    productId,
    productDetails,
    enableReinitialize: true,
  };
}

export default connect(mapStateToProps, actions)(ConnectedRedirections);
