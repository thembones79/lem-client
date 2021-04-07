import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";
import { ActionTypes } from "../../../actions/types";
import { StoreState } from "../../../reducers";
import ProductsList from "./ProductsList";
import NewProduct from "./NewProduct";
import EditProduct from "./EditProduct";

interface IProductRouterProps {
  activeProductComponent: ActionTypes;
  NewProduct: ElementType;
}

class ProductRouter extends Component<IProductRouterProps> {
  renderProductComponent(activeComponent: ActionTypes) {
    const { NewProduct } = this.props;
    switch (activeComponent) {
      case ActionTypes.NEW:
        return <NewProduct />;
      case ActionTypes.EDIT:
        return <EditProduct />;
      case ActionTypes.LIST:
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

function mapStateToProps(state: StoreState) {
  return {
    activeProductComponent: state.wids.activeProductComponent,
    NewProduct,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(ProductRouter));
