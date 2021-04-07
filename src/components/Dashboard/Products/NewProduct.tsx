import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { IAddProduct, addProduct } from "../../../actions";
import { StoreState } from "../../../reducers";
import requireAuth from "../../requireAuth";

interface ILinkAdderProps {
  errorMessage: string;
  addProduct: typeof addProduct;
  backToProductsList: () => void;
}

class NewProduct extends Component<
  InjectedFormProps<IAddProduct> & ILinkAdderProps
> {
  onSubmit = (formProps: IAddProduct) => {
    const { addProduct } = this.props;
    addProduct(formProps);
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="add-user-page">
        <form className="add-user-form " onSubmit={handleSubmit(this.onSubmit)}>
          <h1 className="main-page__title">New Product</h1>
          <fieldset>
            <label className="add-user-form__label" htmlFor="partNumber">
              partNumber
            </label>
            <Field
              className="add-user-form__select"
              name="partNumber"
              type="text"
              placeholder="Part Number"
              component="input"
              required
            />
          </fieldset>

          <div className="alert">{this.renderAlert()}</div>

          <div className="order-buttons">
            <div className="order-buttons__row">
              <button
                className="btn btn--finish btn--accent "
                type="button"
                onClick={() => {
                  this.props.backToProductsList();
                }}
              >
                {"<< back"}
              </button>
              <button
                type="submit"
                className="btn btn--accent "
                disabled={submitting}
              >
                NEXT
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

interface IValidate {
  partNumber?: string;
}

const validate: (values: IValidate) => IValidate = (values) => {
  const errors: IValidate = {};

  if (!values.partNumber) {
    errors.partNumber = "Required";
  }

  return errors;
};

function mapStateToProps(state: StoreState) {
  return { errorMessage: state.wids.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "newProduct", validate: validate })
)(requireAuth(NewProduct)) as ElementType;
