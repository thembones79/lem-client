import React, { Component } from "react";
import { connect } from "react-redux";
import requireAuth from "../requireAuth";
import { StoreState } from "../../reducers";
import * as actions from "../../actions";
import PartnumberProductChooser from "./PartnumberProductChooser";
import LineProductChooser from "./LineProductChooser";
import StickerScanProductChooser from "./StickerScanProductChooser";
import ZkScanProductChooser from "./ZkScanProductChooser";
import "./ProductChooserStyle.scss";

interface IProductChooser {
  PartnumberProductChooser: React.ElementType;
  LineProductChooser: React.ElementType;
  StickerScanProductChooser: React.ElementType;
  ZkScanProductChooser: React.ElementType;
}
class ProductChooser extends Component<IProductChooser> {
  render() {
    const {
      PartnumberProductChooser,
      LineProductChooser,
      StickerScanProductChooser,
      ZkScanProductChooser,
    } = this.props;
    return (
      <div className="product-chooser">
        <PartnumberProductChooser />
        <StickerScanProductChooser />
        <ZkScanProductChooser />
        <LineProductChooser />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    PartnumberProductChooser,
    LineProductChooser,
    StickerScanProductChooser,
    ZkScanProductChooser,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(ProductChooser));
