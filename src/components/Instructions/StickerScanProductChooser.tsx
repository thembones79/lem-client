import React, { Component } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { ProductType, SetMessageAction } from "../../actions";
import { StoreState } from "../../reducers";
import ScannerIcon from "../icons/ScannerIcon";
import "./StickerScanProductChooserStyle.scss";

interface IStickerScanProductChooser {
  errorMessage: string;
  products: ProductType[];
  productId: string;
  isLoading: boolean;
  productDetails: ProductType;
  setMessage: (message: string) => SetMessageAction;
  getProduct: (productId?: string) => void;
}

interface IFormProps {
  scanLittleSticker: string;
}

class StickerScanProductChooser extends Component<
  InjectedFormProps<IFormProps> & IStickerScanProductChooser
> {
  getPartNumberFromScanCode(code: string) {
    return code.substr(4).split("(")[0];
  }

  getIdForPartNumber(partNumber: string) {
    const filteredProducts = this.props.products.filter(
      (product) => product.partNumber === partNumber
    );
    return filteredProducts.length ? filteredProducts[0]._id : null;
  }

  onSubmit = (formProps: IFormProps) => {
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
    const { handleSubmit, isLoading } = this.props;
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
              className={`sticker-scan__label`}
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
              disabled={isLoading}
              className="sticker-scan__input"
            />
          </fieldset>
          <div className="alert">{this.renderAlert()}</div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  const {
    errorMessage,
    productId,
    productDetails,
    products,
    isLoading,
  } = state.wids;
  return {
    errorMessage,
    productId,
    products,
    isLoading,
    productDetails,
    enableReinitialize: true,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "stickerScanProductChooser" })
)(StickerScanProductChooser);
