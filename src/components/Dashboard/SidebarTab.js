import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";

class SidebarTab extends Component {
  handleClick = () => {
    this.props.chooseSidebarTab(this.props.tab);
  };

  render() {
    const { activeSidebarTab, tab, text } = this.props;
    return (
      <div
        onClick={this.handleClick}
        className={`sidebar__tab ${
          activeSidebarTab === tab ? "sidebar__tab--active" : ""
        }`}
      >
        <div className="sidebar__tab__icon"> {this.props.children} </div>
        <div className="sidebar__tab__text"> {text} </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeSidebarTab: state.dashboard.activeSidebarTab,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(SidebarTab));
