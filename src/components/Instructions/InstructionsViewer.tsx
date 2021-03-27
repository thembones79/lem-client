import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import LinkBlock from "./LinkBlock";
import Loader from "../Loader";
import { ROOT_URL } from "../../config";

class InstructionsViewer extends Component {
  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  renderLinksList() {
    const { productDetails } = this.props;
    if (productDetails && productDetails.linksToDocs) {
      return productDetails.linksToDocs.map((link) => (
        <LinkBlock
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

  renderRedirsList() {
    const { productDetails } = this.props;
    if (productDetails && productDetails.linksToRedirs) {
      return productDetails.linksToRedirs.map((redir) => (
        <LinkBlock
          key={redir._id}
          _id={redir._id}
          description={redir.description}
          url={`${ROOT_URL}/api/redirection/${redir.redirRoute}`}
          details={productDetails}
        />
      ));
    }
  }

  renderLists() {
    const {
      productDetails: { linksToDocs, linksToRedirs, partNumber },
      message,
      isLoading,
      errorMessage,
    } = this.props;

    if (errorMessage) {
      return <div className="alert">{this.renderAlert()}</div>;
    }

    if (isLoading) {
      return <Loader />;
    }

    if (message) {
      return <strong>{message}</strong>;
    }

    if (!partNumber) {
      return (
        <>
          <strong>choose part number</strong> <em>or</em>
          <strong>scan code from a sticker</strong> <em>or</em>
          <strong>scan code from a ZK </strong> <em>or</em>
          <strong>choose line to watch</strong>
        </>
      );
    } else if (
      linksToDocs &&
      linksToRedirs &&
      linksToDocs.length === 0 &&
      linksToRedirs.length === 0
    ) {
      return <strong>there are no instructions for {partNumber}</strong>;
    } else {
      return (
        <>
          {this.renderLinksList()}
          {this.renderRedirsList()}
        </>
      );
    }
  }

  renderHeader() {
    const {
      productDetails: { partNumber },
    } = this.props;

    if (partNumber) {
      return `instructions for ${partNumber}`;
    }
  }

  render() {
    return (
      <div className="">
        <div className="link-block-list__header">
          <span className="link-block-list__header__item">
            {this.renderHeader()} &nbsp;
          </span>
        </div>
        <div className="link-block-list">{this.renderLists()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    errorMessage,
    productId,
    productDetails,
    message,
    isLoading,
  } = state.wids;
  return {
    errorMessage,
    productId,
    productDetails,
    message,
    isLoading,
    enableReinitialize: true,
  };
}

export default connect(mapStateToProps, actions)(InstructionsViewer);
