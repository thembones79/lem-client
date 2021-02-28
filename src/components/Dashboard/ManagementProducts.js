import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import ProductsRouter from "./Products/ProductRouter";
import "./MainStyle.scss";

class ManagementProducts extends Component {
  render() {
    return (
      <div className="main-page">
        <ProductsRouter />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(ManagementProducts));
