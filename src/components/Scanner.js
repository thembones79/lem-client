import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import requireAuth from "./requireAuth";

class Scanner extends Component {
  componentDidMount() {
    this.props.fetchMessage();
  }
  render() {
    return <div>This is the scanner!!! {this.props.message}</div>;
  }
}

function mapStateToProps(state) {
  return { message: state.scanner.message };
}

export default connect(mapStateToProps, actions)(requireAuth(Scanner));
