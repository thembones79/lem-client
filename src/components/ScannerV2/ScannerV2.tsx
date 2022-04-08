import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { StoreState } from "../../reducers";
import requireAuth from "../requireAuth";
import Left from "./left";
import Middle from "./middle";
import Right from "./right";

import "./ScannerStyle.scss";

interface IScannerV2Props {
  fetchMessage: () => void;
}

class ScannerV2 extends Component<IScannerV2Props> {
  componentDidMount() {
    this.props.fetchMessage();
  }
  render() {
    return (
      <div className="scanner-page">
        <Left />
        <Middle />
        <Right />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    userType: state.scanner.userType,
    userName: state.scanner.userName,
    userEmail: state.scanner.userEmail,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(ScannerV2));
