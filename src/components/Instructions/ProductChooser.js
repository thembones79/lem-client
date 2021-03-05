import React, { Component } from "react";
import requireAuth from "../requireAuth";
import PartnumberProductChooser from "./PartnumberProductChooser";
import LineProductChooser from "./LineProductChooser";
import StickerScanProductChooser from "./StickerScanProductChooser";
import ZkScanProductChooser from "./ZkScanProductChooser";
import "./ProductChooserStyle.scss";

class ProductChooser extends Component {
  render() {
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

export default requireAuth(ProductChooser);
