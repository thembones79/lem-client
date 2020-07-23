import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signup extends Component {
  onSubmit = (formProps) => {
    this.props.signup(formProps, () => {
      this.props.history.push("/scanner");
    });
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label htmlFor="firstname">First name</label>
          <Field name="firstname" type="text" component="input" required />
        </fieldset>
        <fieldset>
          <label htmlFor="lastname">Last name</label>
          <Field name="lastname" type="text" component="input" required />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="email"
            component={this.renderField}
            autoComplete="none"
            required
          />
        </fieldset>
        <fieldset>
          <Field
            name="password"
            type="password"
            component={this.renderField}
            label="Password"
            required
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <Field
            name="passwordConfirm"
            type="password"
            component="input"
            required
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="type">Type</label>
          <Field name="type" type="text" component="select" required>
            <option value="operator">operator</option>
            <option value="manager">manager</option>
          </Field>
        </fieldset>
        <div>{this.props.errorMessage}</div>

        <button disabled={submitting}>Sign Up</button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (values.password !== values.passwordConfirm) {
    errors.password = "Passwords must match";
  }

  return errors;
};
/*
function validate(formProps) {
  const errors = {};
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = "Passwords must match";
  }

  return errors;
}
*/
function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup", validate: validate })
)(Signup);
