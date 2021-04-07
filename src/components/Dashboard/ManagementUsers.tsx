import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import AddUser from "./AddUser";
import { StoreState } from "../../reducers";
import "./MainStyle.scss";

interface IManagementUsersProps {
  authenticated: string | null;
  AddUser: ElementType;
}

class ManagementUsers extends Component<IManagementUsersProps> {
  render() {
    const { AddUser } = this.props;
    return (
      <div className="main-page">
        <AddUser />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
    AddUser,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(ManagementUsers));
