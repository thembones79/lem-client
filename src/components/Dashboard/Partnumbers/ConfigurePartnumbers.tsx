import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import * as actions from "../../../actions";
import { PartnumberConfigType } from "../../../actions";
import { StoreState } from "../../../reducers";
import requireAuth from "../../requireAuth";

interface IConfigurePartnumbersProps extends RouteComponentProps {
  errorMessage: string;
  initialValues: PartnumberConfigType;
  savePartnumberConfig: ({
    sourceOftruth,
    computationsBase,
  }: PartnumberConfigType) => void;
  backToPartnumbersList: () => void;
}

class ConfigurePartnumbers extends Component<
  InjectedFormProps<PartnumberConfigType> & IConfigurePartnumbersProps
> {
  onSubmit = (formProps: PartnumberConfigType) => {
    const { savePartnumberConfig } = this.props;
    savePartnumberConfig(formProps);
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
          <h1 className="main-page__title">Partnumbers Cnfiguration</h1>

          <fieldset>
            <label className="add-user-form__label" htmlFor="sourceOftruth">
              Type
            </label>
            <Field
              className="add-user-form__select"
              name="sourceOftruth"
              type="text"
              component="select"
              required
            >
              <option />
              <option value="internal">internal</option>
              <option value="excel">excel</option>
            </Field>
          </fieldset>

          <fieldset>
            <label className="add-user-form__label" htmlFor="computationsBase">
              Type
            </label>
            <Field
              className="add-user-form__select"
              name="computationsBase"
              type="text"
              component="select"
              required
            >
              <option />
              <option value="hourlyRate">hourlyRate</option>
              <option value="tactTime">tactTime</option>
            </Field>
          </fieldset>

          <div className="alert">{this.renderAlert()}</div>

          <div className="order-buttons">
            <div className="order-buttons__row">
              <button
                className="btn btn--finish btn--accent "
                onClick={() => {
                  this.props.backToPartnumbersList();
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

function mapStateToProps(state: StoreState) {
  const { errorMessage, partnumberConfig } = state.dashboard;
  return {
    errorMessage,
    enableReinitialize: true,
    initialValues: partnumberConfig,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "configurePartnumbers" })
)(requireAuth(ConfigurePartnumbers)) as ElementType;
