import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { IStartEditingProduct } from "../../../actions";
import "./ProductItemStyle.scss";

interface IProductItemProps {
  partNumber: string;
  _id: string;
  startEditingProduct: ({ _id, partNumber }: IStartEditingProduct) => void;
  openDeleteProductModal: ({ _id }: { _id: string }) => void;
}

class ProductItem extends Component<IProductItemProps> {
  render() {
    const {
      partNumber,
      _id,
      startEditingProduct,
      openDeleteProductModal,
    } = this.props;

    return (
      <div className="product-row">
        <div className="product-row__items">
          <span className="product-row__item--first">{partNumber}</span>
        </div>

        <div className="product-row__buttons">
          <button
            className="btn btn--finish btn--thin"
            onClick={() => {
              startEditingProduct({
                _id,
                partNumber,
              });
            }}
          >
            EDIT
          </button>
          <button
            className="btn btn--delete btn--thin"
            onClick={() => {
              openDeleteProductModal({ _id });
            }}
          >
            DELETE
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(ProductItem);
