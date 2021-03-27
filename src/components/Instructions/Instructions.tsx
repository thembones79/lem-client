import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import InstructionsViewer from "./InstructionsViewer";
import ProductChooser from "./ProductChooser";
import "./InstructionsStyle.scss";

class Instructions extends Component {
  render() {
    return (
      <div className="instructions-page">
        <ProductChooser />
        <InstructionsViewer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userType: state.scanner.userType,
    userName: state.scanner.userName,
    userEmail: state.scanner.userEmail,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Instructions));
