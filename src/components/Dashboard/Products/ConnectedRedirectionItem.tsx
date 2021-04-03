import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { IDeleteConnectedItem, ProductType } from "../../../actions";
import CrossMarkIcon from "../../icons/CrossMarkIcon";

interface IConnectedRedirectionItemProps {
  deleteConnectedRedirectionItem: ({
    _id,
    partNumber,
    linksToDocs,
    linksToRedirs,
  }: IDeleteConnectedItem) => void;
  description?: string;
  _id: string;
  details: ProductType;
  redirRoute: string;
  targetUrl: string;
  fileName: string;
}

class ConnectedRedirectionItem extends Component<IConnectedRedirectionItemProps> {
  render() {
    const { description, _id, details } = this.props;
    const { partNumber, linksToDocs, linksToRedirs } = details;
    return (
      <div className="product-row">
        <div className="product-row__items">
          <span className="product-row__item--first">{description}</span>
        </div>

        <div className="product-row__buttons">
          <button
            className="btn btn--alt-delete btn--thin"
            onClick={() => {
              this.props.deleteConnectedRedirectionItem({
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

export default connect(null, actions)(ConnectedRedirectionItem);
