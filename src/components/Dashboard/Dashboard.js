import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";

class Dashboard extends Component {
  handleAddUserClick = () => {
    this.props.history.push("/adduser");
  };

  render() {
    return (
      <div>
        <button onClick={this.handleAddUserClick}>Add new user</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Dashboard));
