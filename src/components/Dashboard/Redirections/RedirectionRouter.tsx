import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";
import { ActionTypes } from "../../../actions/types";
import { StoreState } from "../../../reducers";
import RedirectionsList from "./RedirectionsList";
import NewRedirection from "./NewRedirection";
import EditRedirection from "./EditRedirection";
import RedirectionWithProducts from "./RedirectionWithProducts";

interface IRedirectionRouterProps {
  activeRedirectionComponent: ActionTypes;
  NewRedirection: ElementType;
  EditRedirection: ElementType;
  RedirectionsList: ElementType;
  RedirectionWithProducts: ElementType;
}

class RedirectionRouter extends Component<IRedirectionRouterProps> {
  renderRedirectionComponent(activeComponent: ActionTypes) {
    const {
      NewRedirection,
      EditRedirection,
      RedirectionsList,
      RedirectionWithProducts,
    } = this.props;
    switch (activeComponent) {
      case ActionTypes.NEW:
        return <NewRedirection />;
      case ActionTypes.EDIT:
        return <EditRedirection />;
      case ActionTypes.LIST:
        return <RedirectionsList />;
      case ActionTypes.REDIRECTION_WITH_PRODUCTS_PAGE:
        return <RedirectionWithProducts />;

      default:
        return <RedirectionsList />;
    }
  }

  render() {
    return (
      <>
        {this.renderRedirectionComponent(this.props.activeRedirectionComponent)}
      </>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    activeRedirectionComponent: state.wids.activeRedirectionComponent,
    NewRedirection,
    EditRedirection,
    RedirectionsList,
    RedirectionWithProducts,
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(RedirectionRouter));
