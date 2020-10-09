import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import AddUser from "./AddUser";
import "./MainStyle.scss";

class ManagementUsers extends Component {
  handleAddUserClick = () => {
    this.props.history.push("/adduser");
  };

  render() {
    return (
      <div className="main-page">
        <AddUser />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(ManagementUsers));
