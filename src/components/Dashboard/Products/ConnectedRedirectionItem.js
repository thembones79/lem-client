import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import CrossMarkIcon from "../../icons/CrossMarkIcon";

class ConnectedRedirectionItem extends Component {
  render() {
    const { description, _id, details } = this.props;
    return (
      <div className="product-row">
        <div className="product-row__items">
          <span className="product-row__item--first">{description}</span>
        </div>

        <div className="product-row__buttons">
          <button
            className="btn btn--alt-delete btn--thin"
            onClick={() => {
              this.props.deleteConnectedRedirectionItem(_id, { details });
            }}
          >
            <CrossMarkIcon />
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(ConnectedRedirectionItem);
