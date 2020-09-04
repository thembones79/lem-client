import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import ScannerIcon from "../../icons/ScannerIcon";
import "./ReaderInputStyle.scss";

class ReaderInput extends Component {
  componentDidUpdate(prevProps) {
    const nastyWayToForceFocusOnInputComponent = document.querySelector(
      "input"
    );
    nastyWayToForceFocusOnInputComponent.focus();

    if (this.props.existingOrder) {
      if (this.props.existingOrder !== prevProps.existingOrder) {
        if (this.props.existingOrder.orderStatus !== "closed") {
        }
        if (!this.props.existingOrder) {
          this.props.disableReaderInput();
        } else if (this.props.isRunning) {
          this.props.enableReaderInput();
        } else {
          this.props.disableReaderInput();
        }
      }
    }
  }

  compareScanQuantitiesAndClose() {
    if (this.props.existingOrder) {
      const {
        orderNumber,
        _line,
        isOrderedQuantityMatchesValidScansQuantity,
      } = this.props;
      const { orderStatus } = this.props.existingOrder;

      if (
        isOrderedQuantityMatchesValidScansQuantity &&
        orderStatus !== "closed"
      ) {
        this.props.addBreakStart({ orderNumber, _line });

        this.props.pauseOrder();

        this.props.closeOrder({ orderNumber });
        // for clearing cached state
        window.location.reload(false);
      }
    }
  }

  onSubmit = (formProps) => {
    const { orderNumber, _line, userId } = this.props;
    this.props.insertScan(formProps, _line, userId, orderNumber, () => {
      this.compareScanQuantitiesAndClose();
    });
    this.props.reset();
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { handleSubmit, readerInputState } = this.props;
    const { isDisabled } = readerInputState;
    return (
      <div className="reader">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label
              className={`reader__label ${
                isDisabled ? "reader__label--disabled" : ""
              }`}
              htmlFor="scanContent"
            >
              <ScannerIcon />
            </label>
            <Field
              name="scanContent"
              type="text"
              id="scanContent"
              component="input"
              autoComplete="none"
              required
              disabled={isDisabled}
              autoFocus
              className="reader__input"
            />
          </fieldset>
          <div className="alert">{this.renderAlert()}</div>
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
    _line: state.scanner.pickedLine || localStorage.getItem("line"),
    isOrderedQuantityMatchesValidScansQuantity:
      state.scanner.isOrderedQuantityMatchesValidScansQuantity,
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
