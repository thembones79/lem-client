import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import "./RedirectionItemStyle.scss";

class RedirectionItem extends Component {
  render() {
    const { description, redirRoute, fileName, _id } = this.props;

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
            className="btn btn--finish"
            onClick={() => {
              this.props.startEditingRedirection({
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
            className="btn btn--delete"
            onClick={() => {
              this.props.openDeleteReditectionModal(_id);
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