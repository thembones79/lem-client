import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { StoreState } from "../reducers";
import ScannerIcon from "./icons/ScannerIcon";
import DashboardIcon from "./icons/DashboardIcon";
import UserIcon from "./icons/UserIcon";
import LogOutIcon from "./icons/LogOutIcon";
import InstructionIcon from "./icons/InstructionIcon";
import "./HeaderStyle.scss";

interface IHeaderProps {
  authenticated: string | null;
  userType: string;
  userName: string;
  fetchMessage: () => void;
}

class Header extends Component<IHeaderProps> {
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
          <NavLink
            className="nav__link"
            activeClassName="nav__link--selected"
            to="/instructions"
          >
            <InstructionIcon /> Instructions
          </NavLink>
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

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
    userType: state.scanner.userType,
    userName: state.scanner.userName,
  };
}

export default connect(mapStateToProps, actions)(Header);
