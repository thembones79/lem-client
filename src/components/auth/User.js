import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";

class User extends Component {
  componentDidMount() {
    this.props.fetchMessage();
  }
  render() {
    return (
      <div>
        {this.props.message} {this.props.userName}!
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.scanner.message,
    userName: state.scanner.userName,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(User));
