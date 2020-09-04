import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import ScannerIcon from "../components/icons/ScannerIcon";
import DashboardIcon from "../components/icons/DashboardIcon";
import UserIcon from "../components/icons/UserIcon";
import LogOutIcon from "../components/icons/LogOutIcon";
import "./HeaderStyle.scss";

class Header extends Component {
  componentDidMount() {
    this.props.fetchMessage();
  }

  renderManagerLinks() {
    if (this.props.userType === "manager") {
      return (
        <NavLink
          className="nav__link"
          activeClassName="nav__link--selected"
          to="/dashboard"
        >
          <DashboardIcon /> Dashboard
        </NavLink>
      );
    }
  }

  renderNav() {
    if (this.props.authenticated) {
      return (
        <div className="nav">
          {this.renderManagerLinks()}
          <NavLink
            className="nav__link"
            activeClassName="nav__link--selected"
            to="/scanner"
          >
            <ScannerIcon /> Scanner
          </NavLink>
          <NavLink
            className="nav__link"
            activeClassName="nav__link--selected"
            to="/user"
          >
            <UserIcon /> {this.props.userName}
          </NavLink>
          <NavLink
            className="nav__link"
            activeClassName="nav__link--selected"
            to="/signout"
          >
            <LogOutIcon /> Log Out
          </NavLink>
        </div>
      );
    } else {
      return (
        <div>
          <NavLink
            className="nav__link"
            activeClassName="nav__link--selected"
            to="/signin"
          >
            Log In
          </NavLink>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="header">
        <NavLink className="logo" to="/">
          <img
            className="riverdi-lem-logo"
            alt="RiverdiLEM Logo"
            src="RiverdiLemLogo4.svg"
          />
        </NavLink>
        {this.renderNav()}
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
