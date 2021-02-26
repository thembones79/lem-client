import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";
import { NEW, EDIT, LIST } from "../../../actions/types";
import RedirectionsList from "./RedirectionsList";
import NewRedirection from "./NewRedirection";
import EditRedirection from "./EditRedirection";

class RedirectionRouter extends Component {
  renderRedirectionComponent(activeComponent) {
    switch (activeComponent) {
      case NEW:
        return <NewRedirection />;
      case EDIT:
        return <EditRedirection />;
      case LIST:
        return <RedirectionsList />;

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
