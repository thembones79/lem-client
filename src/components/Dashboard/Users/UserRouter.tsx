import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";
import { ActionTypes } from "../../../actions/types";
import { StoreState } from "../../../reducers";
import UsersList from "./UsersList";
import AddUser from "./AddUser";
import ChangePassword from "./ChangePassword";

interface IUserRouterProps {
  activeUserComponent: ActionTypes;
  AddUser: ElementType;
  ChangePassword: ElementType;
  UsersList: ElementType;
}

class UserRouter extends Component<IUserRouterProps> {
  renderUserComponent(activeComponent: ActionTypes) {
    const {
  AddUser,
  ChangePassword,
  UsersList,
    } = this.props;
    switch (activeComponent) {
      case ActionTypes.NEW:
        return <AddUser />;
      case ActionTypes.EDIT:
        return <ChangePassword />;
      case ActionTypes.LIST:
        return <UsersList />;

      default:
        return <UsersList />;
    }
  }

  render() {
    return (
      <>
        {this.renderUserComponent(this.props.activeUserComponent)}
      </>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    activeUserComponent: state.dashboard.activeUserComponent,
  AddUser,
  ChangePassword,
  UsersList,
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(UserRouter));
