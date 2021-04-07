import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { StoreState } from "../../reducers";
import requireAuth from "../requireAuth";
import "./UserStyle.scss";

interface IUserProps extends RouteComponentProps {
  message: string;
  userName: string;
  fetchMessage: () => actions.FetchMessageAction;
}

class User extends Component<IUserProps> {
  componentDidMount() {
    this.props.fetchMessage();
  }
  render() {
    return (
      <div className="user-page">
        {this.props.message} {this.props.userName}!
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    message: state.scanner.message,
    userName: state.scanner.userName,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(User));
