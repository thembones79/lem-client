import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import * as actions from "../../../actions";
import {
  PartnumberType,
  PartnumberConfigType,
  ComputationsBase,
} from "../../../actions";
import { hourlyPaceToTactTime } from "../../../utils/hourlyPaceToTactTime";
import { tactTimeToHourlyPace } from "../../../utils/tactTimeToHourlyPace";
import { StoreState } from "../../../reducers";
import requireAuth from "../../requireAuth";

interface IEditPartnumberProps extends RouteComponentProps {
  errorMessage: string;
  redirectionId: string;
  partnumberConfig: PartnumberConfigType;
  initialValues: PartnumberType;
  givenTactTime: number;
  givenHourlyRate: number;
  updateGivenTactTime: (givenTactTime: string) => void;
  updateGivenHourlyRate: (givenHourlyRate: string) => void;
  savePartnumber: (
    { givenHourlyRate, givenTactTime }: PartnumberType,
    id: string
  ) => void;
  backToPartnumbersList: () => void;
}

class PartnumberEdit extends Component<
  InjectedFormProps<PartnumberType> & IEditPartnumberProps
> {
  componentDidMount() {
    const { initialValues, updateGivenHourlyRate, updateGivenTactTime } =
      this.props;
    const { givenHourlyRate, givenTactTime } = initialValues;
    updateGivenHourlyRate(givenHourlyRate + "");
    updateGivenTactTime(givenTactTime + "");
  }

  onSubmit = (formProps: PartnumberType) => {
    const { savePartnumber, initialValues } = this.props;
    savePartnumber(formProps, initialValues._id);
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  renderConditionalFields = () => {
    const {
      initialValues,
      partnumberConfig,
      givenHourlyRate,
      givenTactTime,
      updateGivenHourlyRate,
      updateGivenTactTime,
    } = this.props;
    const { suggestedTactTime, suggestedHourlyRate } = initialValues;
    const { computationsBase } = partnumberConfig;

    if (computationsBase === ComputationsBase.tactTime) {
      return (
        <>
          <fieldset>
            <label className="add-user-form__label" htmlFor="givenTactTime">
              givenTactTime
            </label>
            <Field
              className="add-user-form__select"
              name="givenTactTime"
              type="number"
              placeholder="given tact time"
              component="input"
              min="1"
              max="7200"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                updateGivenTactTime(e.currentTarget.value)
              }
              required
            />
          </fieldset>
          <fieldset>
            <label className="add-user-form__label" htmlFor="suggestedTactTime">
              suggestedTactTime
            </label>
            <div className="add-user-form__static">{suggestedTactTime}</div>
          </fieldset>
          <fieldset>
            <label className="add-user-form__label" htmlFor="suggestedTactTime">
              computedHourlyRate
            </label>
            <div className="add-user-form__static">
              {tactTimeToHourlyPace(givenTactTime)}
            </div>
          </fieldset>
        </>
      );
    }

    if (computationsBase === ComputationsBase.hourlyRate) {
      return (
        <>
          <fieldset>
            <label className="add-user-form__label" htmlFor="givenHourlyRate">
              givenHourlyRate
            </label>
            <Field
              className="add-user-form__select"
              name="givenHourlyRate"
              type="number"
              placeholder="given hourly rate"
              component="input"
              min="1"
              max="3600"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                updateGivenHourlyRate(e.currentTarget.value)
              }
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
            <div className="add-user-form__static">{suggestedHourlyRate}</div>
          </fieldset>
          <fieldset>
            <label className="add-user-form__label" htmlFor="suggestedTactTime">
              computedTactTime
            </label>
            <div className="add-user-form__static">
              {hourlyPaceToTactTime(givenHourlyRate)}
            </div>
          </fieldset>
        </>
      );
    }
  };

  render() {
    const { handleSubmit, submitting, initialValues } = this.props;
    const { xlsxTactTime, partNumber } = initialValues;
    console.log({ props: this.props });
    return (
      <div className="add-user-page">
        <form className="add-user-form " onSubmit={handleSubmit(this.onSubmit)}>
          <h1 className="main-page__title">{partNumber}</h1>
          {this.renderConditionalFields()}
          <fieldset>
            <label className="add-user-form__label" htmlFor="xlsxTactTime">
              xlsxTactTime
            </label>
            <div className="add-user-form__static">{xlsxTactTime}</div>
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
  const {
    errorMessage,
    partnumberDetails,
    partnumberConfig,
    givenHourlyRate,
    givenTactTime,
  } = state.dashboard;
  return {
    errorMessage,
    partnumberConfig,
    givenHourlyRate,
    givenTactTime,
    enableReinitialize: true,
    initialValues: partnumberDetails,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "partnumberEdit" })
)(requireAuth(PartnumberEdit)) as ElementType;
