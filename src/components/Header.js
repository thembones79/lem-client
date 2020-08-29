import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import "./HeaderStyle.scss";

class Header extends Component {
  componentDidMount() {
    this.props.fetchMessage();
  }

  renderManagerLinks() {
    if (this.props.userType === "manager") {
      return (
        <Link className="header__link" to="/dashboard">
          Dashboard
        </Link>
      );
    }
  }

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          {this.renderManagerLinks()}
          <Link className="header__link" to="/scanner">
            Scanner
          </Link>
          <Link className="header__link" to="/user">
            {this.props.userName}
          </Link>
          <Link className="header__link" to="/signout">
            Log Out
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link className="header__link" to="/signin">
            Log In
          </Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="header">
        <Link className="header__link" to="/">
          Riverdi LEM
        </Link>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    userType: state.scanner.userType,
    userName: state.scanner.userName,
  };
}

export default connect(mapStateToProps, actions)(Header);
