import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./HeaderStyle.scss";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link className="header__link" to="/signout">
            Sign Out
          </Link>
          <Link to="/scanner">Scanner</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link className="header__link" to="/signup">
            Sign Up
          </Link>
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
          Redux Auth
        </Link>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
