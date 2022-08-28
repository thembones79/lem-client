import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  StartChangingPasswordAction,
} from "../../../actions";
import "./UsersListItemStyle.scss";

interface IUsersListItemProps {
  firstname: string;
  lastname: string;
  email: string;
  _id: string;
  startChangingPassword: (userId:string) => StartChangingPasswordAction;
}

class UsersListItem extends Component<IUsersListItemProps> {
  render() {
    const {
      startChangingPassword,
      firstname,
      lastname,
      email,
      _id,
    } = this.props;

    return (
      <div className="redirection-row">
        <div className="redirection-row__items">
          <span className="redirection-row__item--first">{firstname}</span>
          <span className="redirection-row__item">{lastname}</span>
          <span className="redirection-row__item">{email}</span>
        </div>

        <div className="redirection-row__buttons">
          <button
            className="btn btn--finish btn--thin"
            onClick={() => {
              startChangingPassword(
                _id,
              );
            }}
          >
          NEW PASS
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(UsersListItem);
