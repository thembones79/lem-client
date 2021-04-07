import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import * as actions from "../../../actions";
import {
  AddProductsToRedirectionAction,
  RedirectionType,
  IRedirection,
  IAddProductsToRedirection,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import requireAuth from "../../requireAuth";

interface IEditRedirectionProps extends RouteComponentProps {
  errorMessage: string;
  redirectionId: string;
  initialValues: RedirectionType;
  saveRedirection: (
    { redirectFrom, redirectTo, description }: IRedirection,
    id: string
  ) => void;
  backToRedirectionsList: () => void;
  addProductsToRedirection: (
    initialData: IAddProductsToRedirection
  ) => AddProductsToRedirectionAction;
}

class EditRedirection extends Component<
  InjectedFormProps<IRedirection> & IEditRedirectionProps
> {
  onSubmit = (formProps: IRedirection) => {
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
          <h1 className="main-page__title">Edit Redirection</h1>
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
            <div className="order-buttons__row">
              <button
                className="btn btn--warning "
                onClick={() => {
                  this.props.addProductsToRedirection(this.props.initialValues);
                }}
              >
                {"attach to MANY products"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

interface IValidate {
  redirectFrom?: string;
  redirectTo?: string;
}

const validate: (values: IValidate) => IValidate = (values) => {
  const errors: IValidate = {};

  if (!values.redirectFrom) {
    errors.redirectFrom = "Required";
  }

  if (!values.redirectTo) {
    errors.redirectTo = "Required";
  }

  return errors;
};

function mapStateToProps(state: StoreState) {
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
  reduxForm({ form: "editRedirection", validate: validate })
)(requireAuth(EditRedirection)) as ElementType;
