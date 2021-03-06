import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";

class RedirectionWithProducts extends Component {
  onSubmit = (formProps) => {
    const { saveRedirection, redirectionId } = this.props;
    saveRedirection(formProps, redirectionId);
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
          <h1 className="main-page__title">RedirectionWithProducts</h1>
          <fieldset>
            <label className="add-user-form__label" htmlFor="description">
              description
            </label>
            <Field
              className="add-user-form__select"
              name="description"
              type="text"
              placeholder="Full Description"
              component="input"
              required
            />
          </fieldset>
          <fieldset>
            <label className="add-user-form__label" htmlFor="redirectFrom">
              redirect from
            </label>
            <Field
              className="add-user-form__select"
              name="redirectFrom"
              type="text"
              placeholder="route-name"
              component="input"
              required
            />
          </fieldset>
          <fieldset>
            <label className="add-user-form__label" htmlFor="redirectTo">
              redirect to
            </label>
            <Field
              className="add-user-form__select"
              name="redirectTo"
              type="text"
              placeholder="file name (without extension)"
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
                  this.props.backToRedirectionsList();
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

  if (!values.redirectFrom) {
    errors.redirectFrom = "Required";
  }

  if (!values.redirectTo) {
    errors.redirectTo = "Required";
  }

  return errors;
};

function mapStateToProps(state) {
  const { errorMessage, redirectionId, initRedirection } = state.wids;
  return {
    errorMessage,
    redirectionId,
    enableReinitialize: true,
    initialValues: initRedirection,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "redirectionWithProducts", validate: validate })
)(requireAuth(RedirectionWithProducts));
