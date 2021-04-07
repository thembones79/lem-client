import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { ProductType } from "../../../actions";
import { StoreState } from "../../../reducers";
import ConnectedLinks from "./ConnectedLinks";
import ConnectedRedirections from "./ConnectedRedirections";
import LinkAdder from "./LinkAdder";
import RedirectionAdder from "./RedirectionAdder";
import "./EditProductStyle.scss";

interface IEditProductProps {
  errorMessage?: string;
  productId?: string;
  productDetails?: ProductType;
  enableReinitialize: boolean;
  initialValues?: ProductType;
  getProduct: (productId?: string | undefined) => void;
  backToProductsList: () => void;
  LinkAdder: ElementType;
  RedirectionAdder: ElementType;
}

class EditProduct extends Component<IEditProductProps> {
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
    const { LinkAdder, RedirectionAdder } = this.props;
    return (
      <div className="edit-product">
        <div className="edit-product__header">
          <h1 className="main-page__title">
            {this.props.productDetails
              ? this.props.productDetails.partNumber
              : " "}
          </h1>
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

function mapStateToProps(state: StoreState) {
  const { errorMessage, productId, productDetails } = state.wids;
  return {
    errorMessage,
    productId,
    productDetails,
    enableReinitialize: true,
    initialValues: productDetails,
    LinkAdder,
    RedirectionAdder,
  };
}

export default connect(mapStateToProps, actions)(EditProduct);
