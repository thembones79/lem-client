import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ScannerIcon from "../icons/ScannerIcon";
import "./StickerScanProductChooserStyle.scss";

class StickerScanProductChooser extends Component {
  getPartNumberFromScanCode(code) {
    return code.substr(4).split("(")[0];
  }

  getIdForPartNumber(partNumber) {
    const filteredProducts = this.props.products.filter(
      (product) => product.partNumber === partNumber
    );
    return filteredProducts.length ? filteredProducts[0]._id : null;
  }

  onSubmit = (formProps) => {
    const { getProduct, reset, setMessage } = this.props;
    const code = formProps.scanLittleSticker;
    const partNumber = this.getPartNumberFromScanCode(code);
    const id = this.getIdForPartNumber(partNumber);
    if (id) {
      setMessage("");
      getProduct(id);
    }

    if (!id) {
      setMessage(`product ${partNumber} is not defined yet`);
    }
    reset();
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const isDisabled = false;

    return (
      <div>
        <form className="sticker-scan" onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label
              className="product-chooser-form__label"
              htmlFor="scanLittleSticker"
            >
              scan a little sticker
            </label>
            <label
              className={`sticker-scan__label ${
                isDisabled ? "sticker-scan__label--disabled" : ""
              }`}
              htmlFor="scanLittleSticker"
            >
              <ScannerIcon />
            </label>
            <Field
              name="scanLittleSticker"
              type="text"
              id="scanLittleSticker"
              component="input"
              autoComplete="none"
              required
              disabled={isDisabled}
              className="sticker-scan__input"
            />
          </fieldset>
          <div className="alert">{this.renderAlert()}</div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    errorMessage,
    productId,
    productDetails,
    products,
    message,
  } = state.wids;
  return {
    errorMessage,
    productId,
    products,
    message,
    productDetails,
    enableReinitialize: true,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "stickerScanProductChooser" })
)(StickerScanProductChooser);
