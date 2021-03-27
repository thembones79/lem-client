import React, { Component, ReactChild } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Tab, IChooseSidebarTab, ChooseSidebarTabAction } from "../../actions";
import { StoreState } from "../../reducers";
import requireAuth from "../requireAuth";

interface ISidebarTabProps {
  activeSidebarTab: Tab;
  children: ReactChild;
  text: string;
  tab: Tab;
  chooseSidebarTab: ({ tab }: IChooseSidebarTab) => ChooseSidebarTabAction;
}

class SidebarTab extends Component<ISidebarTabProps> {
  handleClick = () => {
    const { tab, chooseSidebarTab } = this.props;
    chooseSidebarTab({ tab });
  };

  render() {
    const { activeSidebarTab, tab, text, children } = this.props;
    return (
      <div
        onClick={this.handleClick}
        className={`sidebar__tab ${
          activeSidebarTab === tab ? "sidebar__tab--active" : ""
        }`}
      >
        <div className="sidebar__tab__icon"> {children} </div>
        <div className="sidebar__tab__text"> {text} </div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    activeSidebarTab: state.dashboard.activeSidebarTab,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(SidebarTab));
