import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import "./ProductItemStyle.scss";

class ProductItem extends Component {
  render() {
    const { partNumber, _id } = this.props;

    return (
      <div className="product-row">
        <div className="product-row__items">
          <span className="product-row__item--first">{partNumber}</span>
        </div>

        <div className="product-row__buttons">
          <button
            className="btn btn--finish btn--thin"
            onClick={() => {
              this.props.startEditingProduct({
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
              this.props.openDeleteProductModal(_id);
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
