import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { StoreState } from "../../reducers";
import requireAuth from "../requireAuth";
import Reader from "./left/Reader";
import MiddlePanel from "./middle/MiddlePanel";
import RightPanel from "./right/RightPanel";
import "./ScannerStyle.scss";

interface IScannerProps {
  fetchMessage: () => void;
}

class Scanner extends Component<IScannerProps> {
  componentDidMount() {
    this.props.fetchMessage();
  }
  render() {
    return (
      <div className="scanner-page">
        <Reader />
        <MiddlePanel />
        <RightPanel />
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

export default connect(mapStateToProps, actions)(requireAuth(Scanner));
