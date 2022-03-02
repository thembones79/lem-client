import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import * as actions from "../../../actions";
import { PartnumberType } from "../../../actions";
import { StoreState } from "../../../reducers";
import requireAuth from "../../requireAuth";

interface IEditPartnumberProps extends RouteComponentProps {
  errorMessage: string;
  redirectionId: string;
  initialValues: PartnumberType;
  savePartnumber: (
    { givenHourlyRate, givenTactTime }: PartnumberType,
    id: string
  ) => void;
  backToPartnumbersList: () => void;
}

class PartnumberEdit extends Component<
  InjectedFormProps<PartnumberType> & IEditPartnumberProps
> {
  onSubmit = (formProps: PartnumberType) => {
    const { savePartnumber, initialValues } = this.props;
    savePartnumber(formProps, initialValues._id);
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
          <h1 className="main-page__title">Edit Partnumber</h1>
          <fieldset>
            <label className="add-user-form__label" htmlFor="givenTactTime">
              givenTactTime
            </label>
            <Field
              className="add-user-form__select"
              name="givenTactTime"
              type="text"
              placeholder="given tact time"
              component="input"
              required
            />
          </fieldset>
          <fieldset>
            <label className="add-user-form__label" htmlFor="suggestedTactTime">
              suggestedTactTime
            </label>
            <Field
              className="add-user-form__select"
              name="suggestedTactTime"
              type="text"
              placeholder="suggested tact time"
              component="input"
              required
            />
          </fieldset>
          <fieldset>
            <label className="add-user-form__label" htmlFor="givenHourlyRate">
              givenHourlyRate
            </label>
            <Field
              className="add-user-form__select"
              name="givenHourlyRate"
              type="text"
              placeholder="given hourly rate"
              component="input"
              required
            />
          </fieldset>
          <fieldset>
            <label
              className="add-user-form__label"
              htmlFor="suggestedHourlyRate"
            >
              suggestedHourlyRate
            </label>
            <Field
              className="add-user-form__select"
              name="suggestedHourlyRate"
              type="text"
              placeholder="suggested hourly rate"
              component="input"
              required
            />
          </fieldset>
          <fieldset>
            <label className="add-user-form__label" htmlFor="xlsxTactTime">
              xlsxTactTime
            </label>
            <Field
              className="add-user-form__select"
              name="xlsxTactTime"
              type="text"
              placeholder="excel tact time"
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
  const { errorMessage, partnumberDetails } = state.dashboard;
  return {
    errorMessage,
    enableReinitialize: true,
    initialValues: partnumberDetails,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "partnumberEdit" })
)(requireAuth(PartnumberEdit)) as ElementType;
