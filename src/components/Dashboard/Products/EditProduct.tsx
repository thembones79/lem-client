import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import ConnectedLinks from "./ConnectedLinks";
import ConnectedRedirections from "./ConnectedRedirections";
import LinkAdder from "./LinkAdder";
import RedirectionAdder from "./RedirectionAdder";
import "./EditProductStyle.scss";

class EditProduct extends Component {
  async componentDidMount() {
    const { productId } = this.props;
    await this.props.getProduct(productId);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const {
      productDetails: { partNumber },
    } = this.props;

    return (
      <div className="edit-product">
        <div className="edit-product__header">
          <h1 className="main-page__title">{partNumber ? partNumber : " "}</h1>
          <button
            className="btn btn--finish btn--accent adder-form__select--medium"
            onClick={() => {
              this.props.backToProductsList();
            }}
          >
            {"<< products list"}
          </button>
        </div>
        <LinkAdder />
        <RedirectionAdder />
        <div className="connected-lists">
          <ConnectedLinks />
          <ConnectedRedirections />
        </div>
        <div className="alert">{this.renderAlert()}</div>
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
    initialValues: productDetails,
  };
}

export default connect(mapStateToProps, actions)(EditProduct);
