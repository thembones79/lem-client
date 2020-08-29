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
        <Link className="header__link" to="/adduser">
          Add User
        </Link>
      );
    }
  }

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link className="header__link" to="/signout">
            Sign Out
          </Link>
          <Link className="header__link" to="/scanner">
            Scanner
          </Link>
          {this.renderManagerLinks()}
        </div>
      );
    } else {
      return (
        <div>
          <Link className="header__link" to="/signin">
            Sign In
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
  };
}

export default connect(mapStateToProps, actions)(Header);
