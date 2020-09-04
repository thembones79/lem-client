import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./SignoutStyle.scss";

class Signout extends Component {
  componentDidMount() {
    if (this.props.line) {
      this.props.freeLine(this.props.line); // free ocuppied line
    }

    this.props.signout(); // sigout is a name of action creator
  }
  render() {
    return <div className="signout-page">Sorry to see you go</div>;
  }
}
function mapStateToProps(state) {
  return { line: state.scanner.pickedLine || localStorage.getItem("line") };
}
export default connect(mapStateToProps, actions)(Signout);
