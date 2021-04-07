import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  IStartEditingRedirection,
  StartEditingRedirectionAction,
  IOpenDeleteRedirectionModal,
  OpenDeleteRedirectionModalAction,
} from "../../../actions";
import "./RedirectionItemStyle.scss";

interface IRedirectionItemProps {
  description: string;
  redirRoute: string;
  fileName: string;
  _id: string;
  startEditingRedirection: (
    initialData: IStartEditingRedirection
  ) => StartEditingRedirectionAction;
  openDeleteRedirectionModal: ({
    _id,
  }: IOpenDeleteRedirectionModal) => OpenDeleteRedirectionModalAction;
}

class RedirectionItem extends Component<IRedirectionItemProps> {
  render() {
    const {
      description,
      redirRoute,
      fileName,
      _id,
      startEditingRedirection,
      openDeleteRedirectionModal,
    } = this.props;

    return (
      <div className="redirection-row">
        <div className="redirection-row__items">
          <span className="redirection-row__item--first">{description}</span>
          <span className="redirection-row__item">{redirRoute}</span>
          <span className="redirection-row__item">
            {fileName ? fileName : "XxX"}
          </span>
        </div>

        <div className="redirection-row__buttons">
          <button
            className="btn btn--finish btn--thin"
            onClick={() => {
              startEditingRedirection({
                _id,
                description,
                redirectFrom: redirRoute,
                redirectTo: fileName,
              });
            }}
          >
            EDIT
          </button>
          <button
            className="btn btn--delete btn--thin"
            onClick={() => {
              openDeleteRedirectionModal({ _id });
            }}
          >
            DELETE
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(RedirectionItem);
