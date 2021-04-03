import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { IDeleteConnectedItem, ProductType } from "../../../actions";
import CrossMarkIcon from "../../icons/CrossMarkIcon";

interface IConnectedLinkItemProps {
  deleteConnectedLinkItem: ({
    _id,
    partNumber,
    linksToDocs,
    linksToRedirs,
  }: IDeleteConnectedItem) => void;
  description: string;
  _id: string;
  details: ProductType;
  url: string;
  fileName: string;
}

class ConnectedLinkItem extends Component<IConnectedLinkItemProps> {
  render() {
    const { description, _id, details, deleteConnectedLinkItem } = this.props;
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
              deleteConnectedLinkItem({
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
