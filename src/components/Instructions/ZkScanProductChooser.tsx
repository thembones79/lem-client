import React, { Component } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { ProductType, MenuDataType, SetMessageAction } from "../../actions";
import { StoreState } from "../../reducers";
import ScannerIcon from "../icons/ScannerIcon";

interface IFormProps extends React.ChangeEvent<HTMLInputElement> {
  scanZk: string;
}

interface IZkScanProductChooserProps {
  errorMessage: string;
  products: ProductType[];
  productId: string;
  isLoading: boolean;
  menu: MenuDataType;
  productDetails: ProductType;
  getProduct: (productId?: string) => void;
  setMessage: (message: string) => SetMessageAction;
  getMenu: () => void;
}

class ZkScanProductChooser extends Component<
  InjectedFormProps<IFormProps> & IZkScanProductChooserProps
> {
  async componentDidMount() {
    await this.props.getMenu();
  }

  getPartNumberFromZk(zk: string) {
    const {
      menu: { menuContent },
    } = this.props;
    const orders = menuContent.filter((order) => order.orderNumber === zk);
    return orders.length ? orders[0].partNumber : null;
  }

  getIdForPartNumber(partNumber: string | null) {
    const filteredProducts = this.props.products.filter(
      (product) => product.partNumber === partNumber
    );
    return filteredProducts.length ? filteredProducts[0]._id : null;
  }

  onSubmit = (formProps: IFormProps) => {
    const { getProduct, reset, setMessage } = this.props;
    const zk = formProps.scanZk;
    const partNumber = this.getPartNumberFromZk(zk);
    const id = this.getIdForPartNumber(partNumber);

    if (!partNumber) {
      setMessage(`order ${zk} is not found`);
    } else if (!id) {
      setMessage(`product ${partNumber} is not defined yet`);
    } else if (id) {
      setMessage("");
      getProduct(id);
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
            <label className="product-chooser-form__label" htmlFor="scanZk">
              scan a big ZK sheet
            </label>
            <label className={`sticker-scan__label`} htmlFor="scanZk">
              <ScannerIcon />
            </label>
            <Field
              name="scanZk"
              type="text"
              id="scanZk"
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
    isLoading,
    products,
  } = state.wids;
  const { menu } = state.scanner;
  return {
    errorMessage,
    productId,
    products,
    isLoading,
    menu,
    productDetails,
    enableReinitialize: true,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "zkScanProductChooser" })
)(ZkScanProductChooser);
