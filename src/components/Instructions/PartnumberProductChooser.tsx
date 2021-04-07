import React, { Component } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { by } from "../../utils/by";
import * as actions from "../../actions";
import { ProductType, MenuDataType, SetMessageAction } from "../../actions";
import { StoreState } from "../../reducers";
import requireAuth from "../requireAuth";

interface IFormProps extends React.ChangeEvent<HTMLInputElement> {
  _id: string;
}

interface IPartnumberProductChooserProps {
  errorMessage: string;
  products: ProductType[];
  productId: string;
  isLoading: boolean;
  menu: MenuDataType;
  productDetails: ProductType;
  getProduct: (productId?: string) => void;
  setMessage: (message: string) => SetMessageAction;
  getProducts: () => void;
}

class PartnumberProductChooser extends Component<
  InjectedFormProps<IFormProps> & IPartnumberProductChooserProps
> {
  async componentDidMount() {
    await this.props.getProducts();
  }

  handleChange = (formProps: IFormProps) => {
    const { getProduct, setMessage, reset } = this.props;
    const id = formProps.target.value;
    if (id) {
      setMessage("");
      getProduct(id);
    }
    reset();
  };

  renderOptions() {
    const { products } = this.props;
    if (products) {
      return (
        <>
          {products.sort(by("partNumber")).map((product) => {
            const { _id, partNumber } = product;
            return <option key={_id} value={_id} children={partNumber} />;
          })}
        </>
      );
    }
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="">
        <form className="">
          <fieldset>
            <label className="product-chooser-form__label" htmlFor="_id">
              part number
            </label>
            <Field
              name="_id"
              type="text"
              component="select"
              className="product-chooser-form__select "
              value=""
              disabled={isLoading}
              onChange={this.handleChange}
              required
            >
              <option className="order-picker__option" />
              {this.renderOptions()}
            </Field>
          </fieldset>
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
  reduxForm({ form: "partnumberProductChooser" })
)(requireAuth(PartnumberProductChooser));
