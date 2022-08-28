import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  UserType,
  StartAddingUserAction,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import { by } from "../../../utils/by";
import UsersListItem from "./UsersListItem";
import "./UsersListStyle.scss";

interface IUsersListProps {
  users?: UserType[];
  startAddingUser: () => StartAddingUserAction;
  getUsers: () => void;
}

class UsersList extends Component<IUsersListProps> {
  componentDidMount() {
    this.props.getUsers();
  }

  renderUsersList() {
    const { users } = this.props;
    if (users) {
      return users
        .sort(by("firstname"))
        .map((user) => (
          <UsersListItem
            key={user._id}
            _id={user._id}
            firstname={user.firstname}
            lastname={user.lastname}
            email={user.email}
          />
        ));
    }
  }

  render() {
    return (
      <div className="redirection-page">
        <div className="redirection-page__header">
          <h1 className="main-page__title">Users List</h1>
          <button
            className="btn btn--accent "
            onClick={this.props.startAddingUser}
          >
            ADD USER
          </button>
        </div>
        <div className="redirections-list__header">
          <span className="redirections-list__header__item--first">
            firstname
          </span>
          <span className="redirections-list__header__item">
          lastname
          </span>
          <span className="redirections-list__header__item">
          email
          </span>
        </div>
        <div className="redirections-list">{this.renderUsersList()}</div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  const { users } = state.dashboard;
  return {
    users,
  };
}

export default connect(
  mapStateToProps,
  actions
)(UsersList) as ElementType;
