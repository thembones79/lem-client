import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as actions from "../../../actions";
import { IChangePassword, ChangePasswordAction, ChangePasswordActionError } from "../../../actions";
import requireAuth from "../../requireAuth";
import { StoreState } from "../../../reducers";
import "./AddUserStyle.scss";

interface IChangePasswordProps extends RouteComponentProps {
  errorMessage: string;
  _id: string;
  changePassword: ({ password, _id }: IChangePassword) => ChangePasswordAction | ChangePasswordActionError;
}

class ChangePassword extends Component<InjectedFormProps<IChangePassword> & IChangePasswordProps> {
  onSubmit = (formProps: IChangePassword) => {
    const { _id, changePassword } = this.props;
    const { password } = formProps;
    changePassword({ password, _id })
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="add-user-page">
        <form className="add-user-form " onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label className="add-user-form__label" htmlFor="password">
              Password
            </label>
            <Field
              className="add-user-form__select"
              name="password"
              type="password"
              component="input"
              label="Password"
              required
              autoComplete="none"
            />
          </fieldset>
          <fieldset>
            <label className="add-user-form__label" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <Field
              className="add-user-form__select"
              name="passwordConfirm"
              type="password"
              component="input"
              required
              autoComplete="none"
            />
          </fieldset>
          <div>{this.props.errorMessage}</div>

          <button className="btn btn--accent spacer" disabled={submitting}>
            Change Password
          </button>
        </form>
      </div>
    );
  }
}

interface IValidate {
  passwordConfirm?: string;
  password?: string;
}

const validate: (values: IValidate) => IValidate = (values) => {
  const errors: IValidate = {};

  if (values.password !== values.passwordConfirm) {
    errors.password = "Passwords must match";
  }

  return errors;
};

function mapStateToProps(state: StoreState) {
  return { errorMessage: state.auth.errorMessage, _id: state.dashboard.userId };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "changePassword", validate: validate })
)(requireAuth(withRouter(ChangePassword))) as ElementType;
