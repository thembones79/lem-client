import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";

class PartnumberProductChooser extends Component {
  async componentDidMount() {
    await this.props.getProducts();
  }

  handleChange = (formProps) => {
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
          {products.map((product) => {
            const { _id, partNumber } = product;
            return <option key={_id} value={_id} children={partNumber} />;
          })}
        </>
      );
    }
  }

  render() {
    const { submitting } = this.props;
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
              disabled={submitting}
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

const validate = (values) => {
  const errors = {};

  if (!values._id) {
    errors._id = "Required";
  }

  return errors;
};

function mapStateToProps(state) {
  const { errorMessage, productId, productDetails, products } = state.wids;
  return {
    errorMessage,
    productId,
    products,
    productDetails,
    enableReinitialize: true,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "partnumberProductChooser", validate: validate })
)(requireAuth(PartnumberProductChooser));
