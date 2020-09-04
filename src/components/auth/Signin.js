import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./SigninStyle.scss";

class Signin extends Component {
  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      this.props.history.push("/scanner");
    });
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signin-page">
        <form className="signin-form" onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label className="signin-form__label" htmlFor="email">
              Email
            </label>
            <Field
              className="signin-form__select"
              name="email"
              type="email"
              component="input"
              autoComplete="none"
              required
            />
          </fieldset>
          <fieldset>
            <label className="signin-form__label" htmlFor="password">
              Password
            </label>
            <Field
              className="signin-form__select"
              name="password"
              type="password"
              component="input"
              required
              autoComplete="none"
            />
          </fieldset>

          <div className="alert">{this.renderAlert()}</div>
          <button className="btn btn--accent spacer">Log In</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signin" })
)(Signin);
