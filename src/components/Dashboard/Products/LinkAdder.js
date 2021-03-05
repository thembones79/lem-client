import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";
import "./LinkAdderStyle.scss";

class LinkAdder extends Component {
  onSubmit = (formProps) => {
    const { addLinkInProduct, productDetails } = this.props;
    const { partNumber } = productDetails;
    addLinkInProduct(formProps, partNumber);
    this.props.reset();
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="">
        <form className="adder-form" onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label className="adder-form__label" htmlFor="description">
              description
            </label>
            <Field
              className="adder-form__select"
              name="description"
              type="text"
              placeholder="Full Description"
              component="input"
              required
            />
          </fieldset>

          <fieldset>
            <label className="adder-form__label" htmlFor="fileName">
              file name
            </label>
            <Field
              className="adder-form__select"
              name="fileName"
              type="text"
              placeholder="file name (without extension)"
              component="input"
              required
            />
          </fieldset>

          <div className="alert">{this.renderAlert()}</div>

          <div className="order-buttons">
            <div className="order-buttons__row">
              <button className="btn btn--accent " disabled={submitting}>
                ATTACH FILE
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

  if (!values.redirectFrom) {
    errors.redirectFrom = "Required";
  }

  if (!values.redirectTo) {
    errors.redirectTo = "Required";
  }

  return errors;
};

function mapStateToProps(state) {
  const { errorMessage, productId, productDetails } = state.wids;
  return {
    errorMessage,
    productId,
    productDetails,
    enableReinitialize: true,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "linkAdder", validate: validate })
)(requireAuth(LinkAdder));
