import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import ProductsRouter from "./Products/ProductRouter";
import { StoreState } from "../../reducers";
import "./MainStyle.scss";

interface IManagementProductsProps {
  ProductsRouter: React.ElementType;
}

class ManagementProducts extends Component<IManagementProductsProps> {
  render() {
    const { ProductsRouter } = this.props;
    return (
      <div className="main-page">
        <ProductsRouter />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
    ProductsRouter,
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(ManagementProducts)) as ElementType;
