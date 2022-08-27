import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import UsersRouter from "./Users/UserRouter";
import { StoreState } from "../../reducers";
import "./MainStyle.scss";

interface IManagementUsersProps {
  UsersRouter: React.ElementType;
}

class ManagementUsers extends Component<IManagementUsersProps> {
  render() {
    const { UsersRouter } = this.props;
    return (
      <div className="main-page">
        <UsersRouter />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
    UsersRouter,
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(ManagementUsers)) as ElementType;

