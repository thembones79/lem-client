import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";

class ReaderInput extends Component {
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
    console.log({ propsyReaderInputa: this.props });
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
    errorMessage: state.scanner.errorMessage,
    existingOrder: state.scanner.existingOrder,
    userId: state.scanner.userId,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    lineId: state.scanner.pickedLine || localStorage.getItem("line"),
    orderDetails: state.scanner.orderDetails,
    enableReinitialize: true,
    menu: state.scanner.menu,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "readerInput" })
)(ReaderInput);
