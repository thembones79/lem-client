import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";

class EditProduct extends Component {
  onSubmit = (formProps) => {
    const { saveProduct, productId } = this.props;
    saveProduct(formProps, productId);
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
          <h1 className="main-page__title">Edit Product</h1>
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
                onClick={() => {
                  this.props.backToProductsList();
                }}
              >
                {"<< back"}
              </button>
              <button className="btn btn--accent " disabled={submitting}>
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.partNumber) {
    errors.partNumber = "Required";
  }

  return errors;
};

function mapStateToProps(state) {
  const { errorMessage, productId, initProduct } = state.wids;
  return {
    errorMessage,
    productId,
    enableReinitialize: true,
    initialValues: initProduct,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "editProduct", validate: validate })
)(requireAuth(EditProduct));
