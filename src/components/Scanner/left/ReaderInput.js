import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";

class ReaderInput extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.existingOrder !== prevProps.existingOrder) {
      if (!this.props.existingOrder) {
        this.props.disableReaderInput();
      } else if (this.props.isRunning) {
        this.props.enableReaderInput();
      } else {
        this.props.disableReaderInput();
      }
    }
  }

  onSubmit = (formProps) => {
    const { orderNumber, lineId, userId } = this.props;
    this.props.insertScan(formProps, lineId, userId, orderNumber);
    this.props.reset();
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
    }
  }
  render() {
    const { handleSubmit, readerInputState } = this.props;
    const { isDisabled } = readerInputState;
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
              disabled={isDisabled}
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
    errorMessage: state.scanner.errorMessage,
    existingOrder: state.scanner.existingOrder,
    userId: state.scanner.userId,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    lineId: state.scanner.pickedLine || localStorage.getItem("line"),
    orderDetails: state.scanner.orderDetails,
    enableReinitialize: true,
    menu: state.scanner.menu,
    isPaused: state.scanner.isPaused,
    isRunning: state.scanner.isRunning,
    readerInputState: state.scanner.readerInputState,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "readerInput" })
)(ReaderInput);
