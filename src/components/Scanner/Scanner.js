import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";

class Scanner extends Component {
  componentDidMount() {
    this.props.fetchMessage();
  }
  render() {
    return (
      <div>
        {this.props.message} !!!
        <div>
          Hello {this.props.userName}, {this.props.userType}
        </div>
        <div>Id: {this.props.userId}</div>
        <div>token: {this.props.authenticated}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.scanner.message,
    authenticated: state.auth.authenticated,
    userType: state.scanner.userType,
    userName: state.scanner.userName,
    userId: state.scanner.userId,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Scanner));
