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
  render() {
    const { handleSubmit } = this.props;
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
            component="input"
            autoComplete="none"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <Field
            name="password"
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
        <button>Sign Up</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(Signup);
