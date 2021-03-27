import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import CrossMarkIcon from "../../icons/CrossMarkIcon";

class ConnectedLinkItem extends Component {
  render() {
    const { description, _id, details } = this.props;
    const { partNumber, linksToDocs, linksToRedirs } = details;
    return (
      <div className="product-row">
        <div className="product-row__item--first">
          <span className="">{description}</span>
        </div>

        <div className="product-row__buttons">
          <button
            className="btn btn--alt-delete btn--thin"
            onClick={() => {
              this.props.deleteConnectedLinkItem({
                _id,
                partNumber,
                linksToDocs,
                linksToRedirs,
              });
            }}
          >
            <CrossMarkIcon />
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(ConnectedLinkItem);
