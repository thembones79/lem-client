import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { ProductType } from "../../actions";
import { StoreState } from "../../reducers";
import LinkBlock from "./LinkBlock";
import Loader from "../Loader";
import { ROOT_URL } from "../../config";

interface IInstructionsViewerProps {
  errorMessage?: string;
  productId?: string;
  productDetails?: ProductType;
  message?: string;
  isLoading?: boolean;
}

class InstructionsViewer extends Component<IInstructionsViewerProps> {
  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  renderLinksList() {
    const { productDetails } = this.props;
    if (productDetails?.linksToDocs) {
      return productDetails.linksToDocs.map((link) => (
        <LinkBlock
          key={link._id}
          description={link.description}
          url={link.url}
        />
      ));
    }
  }

  renderRedirsList() {
    const { productDetails } = this.props;
    if (productDetails?.linksToRedirs) {
      return productDetails.linksToRedirs.map((redir) => (
        <LinkBlock
          key={redir._id}
          description={redir.description}
          url={`${ROOT_URL}/api/redirection/${redir.redirRoute}`}
        />
      ));
    }
  }

  renderLists() {
    const { productDetails, message, isLoading, errorMessage } = this.props;

    if (errorMessage) {
      return <div className="alert">{this.renderAlert()}</div>;
    }

    if (isLoading) {
      return <Loader />;
    }

    if (message) {
      return <strong>{message}</strong>;
    }

    if (!productDetails?.partNumber) {
      return (
        <>
          <strong>choose part number</strong> <em>or</em>
          <strong>scan code from a sticker</strong> <em>or</em>
          <strong>scan code from a ZK </strong> <em>or</em>
          <strong>choose line to watch</strong>
        </>
      );
    } else if (
      productDetails?.linksToDocs &&
      productDetails?.linksToRedirs &&
      productDetails?.linksToDocs?.length === 0 &&
      productDetails?.linksToRedirs?.length === 0
    ) {
      return (
        <strong>
          there are no instructions for {productDetails.partNumber}
        </strong>
      );
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
    const { productDetails } = this.props;

    if (productDetails?.partNumber) {
      return `instructions for ${productDetails.partNumber}`;
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

function mapStateToProps(state: StoreState) {
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
