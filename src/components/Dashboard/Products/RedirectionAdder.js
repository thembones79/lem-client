import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { by } from "../../../utils/by";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";

class RedirectionAdder extends Component {
  componentDidMount() {
    this.props.getRedirections();
  }

  onSubmit = async (formProps) => {
    const { addRedirectionInProduct, productDetails, productId } = this.props;
    const { partNumber } = productDetails;
    await addRedirectionInProduct(formProps, partNumber);
    await this.props.getProduct(productId);
    this.props.reset();
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  filteredRedirections(redirections, linksToRedirs) {
    if (!linksToRedirs || linksToRedirs.length === 0) {
      return redirections;
    } else {
      return redirections.filter((redirection) => {
        let foundedRoutes = 0;
        linksToRedirs.forEach((redirectionInProduct) => {
          if (redirectionInProduct.redirRoute === redirection.redirRoute) {
            foundedRoutes++;
          }
        });
        return foundedRoutes === 0;
      });
    }
  }

  renderOptions() {
    const { redirections } = this.props;
    if (redirections) {
      const { productDetails } = this.props;
      const { linksToRedirs } = productDetails;
      return (
        <>
          {this.filteredRedirections(redirections, linksToRedirs)
            .sort(by("description"))
            .map((redirection) => {
              const { _id, description } = redirection;
              return <option key={_id} value={_id} children={description} />;
            })}
        </>
      );
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="">
        <form className="adder-form" onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label className="adder-form__label" htmlFor="_redirection">
              redirection
            </label>
            <Field
              name="_redirection"
              type="text"
              component="select"
              className="adder-form__select adder-form__select--wide"
              value=""
              required
            >
              <option className="order-picker__option" />
              {this.renderOptions()}
            </Field>
          </fieldset>

          <div className="alert">{this.renderAlert()}</div>

          <div className="order-buttons">
            <div className="order-buttons__row">
              <button className="btn btn--accent" disabled={submitting}>
                ATTACH REDIRECTION
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

  if (!values._redirection) {
    errors._redirection = "Required";
  }

  return errors;
};

function mapStateToProps(state) {
  const { errorMessage, productId, productDetails, redirections } = state.wids;
  return {
    errorMessage,
    productId,
    redirections,
    productDetails,
    enableReinitialize: true,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "redirectionAdder", validate: validate })
)(requireAuth(RedirectionAdder));
