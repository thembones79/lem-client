import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";
import { NEW, EDIT, LIST } from "../../../actions/types";
import ProductsList from "./ProductsList";
import NewProduct from "./NewProduct";
import EditProduct from "./EditProduct";

class ProductRouter extends Component {
  renderProductComponent(activeComponent) {
    switch (activeComponent) {
      case NEW:
        return <NewProduct />;
      case EDIT:
        return <EditProduct />;
      case LIST:
        return <ProductsList />;

      default:
        return <ProductsList />;
    }
  }

  render() {
    return (
      <>{this.renderProductComponent(this.props.activeProductComponent)}</>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeProductComponent: state.wids.activeProductComponent,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(ProductRouter));
