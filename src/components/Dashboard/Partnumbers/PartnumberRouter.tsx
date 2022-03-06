import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";
import { ActionTypes } from "../../../actions/types";
import { StoreState } from "../../../reducers";
import PartnumberList from "./PartnumberList";
import PartnumberEdit from "./PartnumberEdit";
import ConfigurePartnumbers from "./ConfigurePartnumbers";

interface IPartnumberRouterProps {
  activePartnumberComponent: ActionTypes;
}

class PartnumberRouter extends Component<IPartnumberRouterProps> {
  renderPartnumberComponent(activeComponent: ActionTypes) {
    switch (activeComponent) {
      case ActionTypes.EDIT:
        return <PartnumberEdit />;
      case ActionTypes.LIST:
        return <PartnumberList />;
      case ActionTypes.CONFIG:
        return <ConfigurePartnumbers />;

      default:
        return <PartnumberList />;
    }
  }

  render() {
    return (
      <>
        {this.renderPartnumberComponent(this.props.activePartnumberComponent)}
      </>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    activePartnumberComponent: state.dashboard.activePartnumberComponent,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(PartnumberRouter));
