import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";
import { ActionTypes } from "../../../actions/types";
import RedirectionsList from "./RedirectionsList";
import NewRedirection from "./NewRedirection";
import EditRedirection from "./EditRedirection";
import RedirectionWithProducts from "./RedirectionWithProducts";

class RedirectionRouter extends Component {
  renderRedirectionComponent(activeComponent) {
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

function mapStateToProps(state) {
  return {
    activeRedirectionComponent: state.wids.activeRedirectionComponent,
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(RedirectionRouter));
