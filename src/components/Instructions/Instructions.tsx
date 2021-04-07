import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import requireAuth from "../requireAuth";
import { StoreState } from "../../reducers";
import InstructionsViewer from "./InstructionsViewer";
import ProductChooser from "./ProductChooser";
import "./InstructionsStyle.scss";

interface IInstructionProps {
  ProductChooser: ElementType;
}

class Instructions extends Component<IInstructionProps> {
  render() {
    const { ProductChooser } = this.props;
    return (
      <div className="instructions-page">
        <ProductChooser />
        <InstructionsViewer />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
    ProductChooser,
  };
}

export default connect(mapStateToProps)(requireAuth(Instructions));
