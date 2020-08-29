import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import Reader from "./left/Reader";
import MiddlePanel from "./middle/MiddlePanel";
import RightPanel from "./right/RightPanel";

class Scanner extends Component {
  componentDidMount() {
    this.props.fetchMessage();
  }
  render() {
    return (
      <div>
        <div>
          <Reader />
          <MiddlePanel />
          <RightPanel />
        </div>
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

export default connect(mapStateToProps, actions)(requireAuth(Scanner));
