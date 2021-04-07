import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { by } from "../../../utils/by";
import * as actions from "../../../actions";
import {
  ProductType,
  RedirectionType,
  IAddRedirectionInProduct,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import requireAuth from "../../requireAuth";

interface IRedirectionAdderFormProps {
  _redirection: string;
}
interface IRedirectionAdderProps extends RouteComponentProps {
  errorMessage: string;
  productId: string;
  redirections: RedirectionType[];
  productDetails: ProductType;
  addRedirectionInProduct: ({
    _redirection,
    partNumber,
  }: IAddRedirectionInProduct) => void;
  getRedirections: () => void;
  getProduct: (productId?: string) => void;
}

class RedirectionAdder extends Component<
  InjectedFormProps<IRedirectionAdderFormProps> & IRedirectionAdderProps
> {
  componentDidMount() {
    this.props.getRedirections();
  }

  onSubmit = async (formProps: IRedirectionAdderFormProps) => {
    const { addRedirectionInProduct, productDetails, productId } = this.props;
    const { partNumber } = productDetails;
    const { _redirection } = formProps;
    await addRedirectionInProduct({ _redirection, partNumber });
    await this.props.getProduct(productId);
    this.props.reset();
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  // becouse context menu should show only redirs that not attached to the product yet
  filteredRedirections(
    redirections: RedirectionType[],
    linksToRedirs: RedirectionType[]
  ) {
    if (!linksToRedirs || linksToRedirs.length === 0) {
      return redirections;
    } else {
      return redirections.filter((redirection) => {
        let foundRoutes = 0;
        linksToRedirs.forEach((redirectionInProduct) => {
          if (redirectionInProduct.redirRoute === redirection.redirRoute) {
            foundRoutes++;
          }
        });
        return foundRoutes === 0;
      });
    }
  }

  renderOptions() {
    const { redirections } = this.props; // all redirs
    if (redirections) {
      const { productDetails } = this.props;
      const linksToRedirs = productDetails?.linksToRedirs; // redirs attached to current product
      return (
        <>
          {this.filteredRedirections(redirections, linksToRedirs)
            .sort(by("description"))
            .map((redirection: RedirectionType) => {
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

interface IValidate {
  _redirection?: string;
}

const validate: (values: IValidate) => IValidate = (values) => {
  const errors: IValidate = {};

  if (!values._redirection) {
    errors._redirection = "Required";
  }

  return errors;
};

function mapStateToProps(state: StoreState) {
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
)(requireAuth(RedirectionAdder)) as ElementType;
