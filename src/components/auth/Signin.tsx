import React from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import * as actions from "../../actions";
import { StoreState } from "../../reducers";
import "./SigninStyle.scss";
import { ISignin, SigninAction, SigninActionError } from "../../actions";

interface ISigninProps extends RouteComponentProps {
  errorMessage: string;
  signin: (
    formProps: ISignin,
    callback: () => void
  ) => SigninAction | SigninActionError;
  // history: RouteComponentProps["history"];
}

class Signin extends React.Component<
  InjectedFormProps<ISignin> & ISigninProps
> {
  onSubmit = (formProps: ISignin): void => {
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

function mapStateToProps(state: StoreState) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signin" })
)(Signin) as React.ComponentType;
