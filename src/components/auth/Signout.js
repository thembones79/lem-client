import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signout extends Component {
  componentDidMount() {
    this.props.signout(); // sigbout is a name of action creator
  }
  render() {
    return <div>Sorry to see you go</div>;
  }
}

export default connect(null, actions)(Signout);
