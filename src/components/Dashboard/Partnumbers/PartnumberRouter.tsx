import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";
import { ActionTypes } from "../../../actions/types";
import { StoreState } from "../../../reducers";
import PartnumberList from "./PartnumberList2";
import PartnumberEdit from "./PartnumberEdit";

interface IPartnumberRouterProps {
  activeOrderComponent: ActionTypes;
}

class PartnumberRouter extends Component<IPartnumberRouterProps> {
  renderOrderComponent(activeComponent: ActionTypes) {
    switch (activeComponent) {
      case ActionTypes.EDIT:
        return <PartnumberEdit />;
      case ActionTypes.LIST:
        return <PartnumberList />;

      default:
        return <PartnumberList />;
    }
  }

  render() {
    return <>{this.renderOrderComponent(this.props.activeOrderComponent)}</>;
  }
}

function mapStateToProps(state: StoreState) {
  return {
    activeOrderComponent: state.dashboard.activeOrderComponent,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(PartnumberRouter));
