import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { by } from "../../../utils/by";
import ProductItem from "./ProductItem";
import "./ProductsListStyle.scss";

class ProductsList extends Component {
  async componentDidMount() {
    await this.props.getProducts();
    await this.filterProducts();
  }

  filterProducts(e) {
    const text = e ? e.currentTarget.value : "";
    const filteredProducts = this.getFilteredProductsForText(text);
    this.props.updateProductsList(filteredProducts);
  }

  getFilteredProductsForText(text) {
    return this.props.products.filter((product) =>
      product.partNumber.toLowerCase().includes(text.toLowerCase())
    );
  }

  renderProductsList() {
    const { filteredProducts } = this.props;

    if (filteredProducts) {
      return filteredProducts
        .sort(by("partNumber"))
        .map((product) => (
          <ProductItem
            key={product._id}
            _id={product._id}
            partNumber={product.partNumber}
          />
        ));
    }
  }

  render() {
    return (
      <div className="product-page">
        <div className="product-page__header">
          <div className="products-list__filter">
            <label className="products-list__filter__label">filter</label>
            <input
              className="products-list__filter__input"
              onChange={(e) => {
                this.filterProducts(e);
              }}
            />
          </div>

          <button
            className="btn btn--accent "
            onClick={this.props.startAddingProduct}
          >
            NEW PRODUCT
          </button>
        </div>
        <div className="products-list__header">
          <span className="products-list__header__item--first">product</span>
        </div>
        <div className="products-list">{this.renderProductsList()}</div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { errorMessage, products, filteredProducts } = state.wids;
  return {
    errorMessage,
    products,
    filteredProducts,
  };
}

export default connect(mapStateToProps, actions)(ProductsList);
