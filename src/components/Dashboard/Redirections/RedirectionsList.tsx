import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  RedirectionType,
  StartAddingRedirectionAction,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import { by } from "../../../utils/by";
import RedirectionItem from "./RedirectionItem";
import "./RedirectionsListStyle.scss";

interface IRedirectionsListProps {
  redirections?: RedirectionType[];
  startAddingRedirection: () => StartAddingRedirectionAction;
  getRedirections: () => void;
}

class RedirectionsList extends Component<IRedirectionsListProps> {
  componentDidMount() {
    this.props.getRedirections();
  }

  renderRedirectionsList() {
    const { redirections } = this.props;
    if (redirections) {
      return redirections
        .sort(by("description"))
        .map((redirection) => (
          <RedirectionItem
            key={redirection._id}
            _id={redirection._id}
            description={redirection.description}
            redirRoute={redirection.redirRoute}
            fileName={redirection.fileName}
          />
        ));
    }
  }

  render() {
    return (
      <div className="redirection-page">
        <div className="redirection-page__header">
          <h1 className="main-page__title">Redirections List</h1>
          <button
            className="btn btn--accent "
            onClick={this.props.startAddingRedirection}
          >
            NEW REDIRECTION
          </button>
        </div>
        <div className="redirections-list__header">
          <span className="redirections-list__header__item--first">
            description
          </span>
          <span className="redirections-list__header__item">
            redirection from
          </span>
          <span className="redirections-list__header__item">
            redirection to
          </span>
        </div>
        <div className="redirections-list">{this.renderRedirectionsList()}</div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  const { redirections } = state.wids;
  return {
    redirections,
  };
}

export default connect(
  mapStateToProps,
  actions
)(RedirectionsList) as ElementType;
