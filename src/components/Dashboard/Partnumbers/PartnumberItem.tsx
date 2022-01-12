import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
// import { IStartEditingPartnumber } from "../../../actions";
import "../Products/ProductItemStyle.scss";

interface IPartnumberItemProps {
  partNumber: string;
  _id: string;
  // startEditingPartnumber: ({
  //   _id,
  //   partNumber,
  // }: IStartEditingPartnumber) => void;
  // openDeletePartnumberModal: ({ _id }: { _id: string }) => void;
}

class PartnumberItem extends Component<IPartnumberItemProps> {
  render() {
    const {
      partNumber,
      _id,
      //      startEditingPartnumber,
      //      openDeletePartnumberModal,
    } = this.props;

    return (
      <div className="product-row">
        <div className="product-row__items">
          <span className="product-row__item--first">{partNumber}</span>
        </div>

        <div className="product-row__buttons">
          <button
            className="btn btn--finish btn--thin"
            //            onClick={() => {
            //             startEditingPartnumber({
            //                _id,
            //                partNumber,
            //              });
            //           }}
          >
            EDIT
          </button>
          <button
            className="btn btn--delete btn--thin"
            //            onClick={() => {
            //              openDeletePartnumberModal({ _id });
            //            }}
          >
            DELETE
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(PartnumberItem);
