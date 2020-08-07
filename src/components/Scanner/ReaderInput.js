import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";

const _line = "5f2574bb21148083191d0f75";
const _user = "5f194c826f17a53d07525068";
const orderNumber = "20/832";

class ReaderInput extends Component {
  onSubmit = (formProps) => {
    this.props.insertScan(formProps, _line, _user, orderNumber);
    this.props.reset();
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label htmlFor="email">:::</label>
            <Field
              name="scanContent"
              type="text"
              component="input"
              autoComplete="none"
              autoFocus
            />
          </fieldset>

          <div>{this.renderAlert()}</div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    existingOrder: state.scanner.existingOrder,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "readerInput" })
)(ReaderInput);
