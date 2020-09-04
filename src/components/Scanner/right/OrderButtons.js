import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../../actions";
import "./OrderButtonsStyle.scss";

class OrderButtons extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.existingOrder !== prevProps.existingOrder) {
      if (
        this.returnOrderRunningStatus() &&
        this.props.existingOrder.orderStatus !== "closed"
      ) {
        this.props.enableReaderInput();
      } else {
        this.props.disableReaderInput();
      }
    }
  }

  returnOrderRunningStatus() {
    const { _line } = this.props;
    if (this.props.existingOrder) {
      if (this.props.existingOrder.breaks) {
        const { breaks } = this.props.existingOrder;
        const thisLineBreaks = breaks.filter((item) => item._line === _line);
        if (thisLineBreaks.length === 0) {
          return true;
        }

        // is running when this line has breaks on this order AND the last break does have end
        const isOrderRunning =
          thisLineBreaks.length > 0 &&
          thisLineBreaks[thisLineBreaks.length - 1].breakEnd
            ? true
            : false;

        return isOrderRunning;
      } else {
        return true;
      }
    }
  }

  createNewOrder() {
    if (this.props.menu) {
      const orders = this.props.menu.menuContent;

      const filteredOrders = orders.filter(
        (order) => order.orderNumber === this.props.orderNumber
      );

      const details = filteredOrders[0];

      const {
        orderNumber,
        quantity,
        partNumber,
        qrCode,
        tactTime,
        customer,
      } = details;

      const orderInfo = {
        orderNumber,
        quantity,
        partNumber,
        qrCode,
        tactTime,
        customer,
      };

      this.props.createOrder(orderInfo);
    }
  }

  beginNewBreak() {
    const { orderNumber, _line } = this.props;
    this.props.addBreakStart({ orderNumber, _line });
    this.props.pauseOrder();
  }

  endCurrentBreak() {
    const { orderNumber, _line } = this.props;
    this.props.addBreakEnd({ orderNumber, _line });
    this.props.resumeOrder();
  }

  handleStartClick = () => {
    this.createNewOrder();
  };

  handlePauseClick = () => {
    this.beginNewBreak();
  };

  handleResumeClick = () => {
    this.endCurrentBreak();
  };

  handleFinishClick = () => {
    this.props.openFinishModal();
  };

  handleDeleteClick = () => {
    this.props.openDeleteModal();
  };

  renderStartPauseResumeButtons(orderRunningStatus) {
    if (!this.props.existingOrder) {
      return (
        <button className="btn btn--accent" onClick={this.handleStartClick}>
          START
        </button>
      );
    }

    const { orderStatus } = this.props.existingOrder;
    if (orderStatus !== "closed") {
      if (orderRunningStatus) {
        return (
          <button className="btn btn--accent" onClick={this.handlePauseClick}>
            PAUSE
          </button>
        );
      } else {
        return (
          <button className="btn btn--accent" onClick={this.handleResumeClick}>
            RESUME
          </button>
        );
      }
    } else {
      return (
        <div className="order-completed">
          order completed &nbsp;{" "}
          <span role="img" aria-label="Confetti">
            🎉
          </span>{" "}
        </div>
      );
    }
  }

  renderFinishButton() {
    if (this.props.existingOrder) {
      const { orderStatus } = this.props.existingOrder;
      if (orderStatus !== "closed") {
        const isReaderInputEnabled = !this.props.readerInputState.isDisabled;
        return (
          <button
            className="btn btn--finish"
            disabled={isReaderInputEnabled}
            onClick={this.handleFinishClick}
          >
            FINISH
          </button>
        );
      }
    }
  }

  renderDeleteButton() {
    if (this.props.existingOrder) {
      const isReaderInputEnabled = !this.props.readerInputState.isDisabled;
      return (
        <button
          className="btn btn--delete"
          disabled={isReaderInputEnabled}
          onClick={this.handleDeleteClick}
        >
          DELETE
        </button>
      );
    }
  }

  renderAllTheButtons() {
    if (this.props.orderNumber && this.props._line) {
      return (
        <div className="order-buttons">
          <div className="order-buttons__row">
            {this.renderStartPauseResumeButtons(
              this.returnOrderRunningStatus()
            )}
          </div>
          <div className="order-buttons__row">
            {this.renderFinishButton()}
            {this.renderDeleteButton()}
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderAllTheButtons()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    _line: state.scanner.pickedLine || localStorage.getItem("line"),
    existingOrder: state.scanner.existingOrder,
    menu: state.scanner.menu,
    isPaused: state.scanner.isPaused,
    isRunning: state.scanner.isRunning,
    errorMessage: state.scanner.errorMessage,
    readerInputState: state.scanner.readerInputState,
  };
}
export default connect(mapStateToProps, actions)(OrderButtons);
