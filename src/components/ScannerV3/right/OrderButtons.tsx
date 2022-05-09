import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  OrderType,
  MenuDataType,
  EnableReaderInputAction,
  DisableReaderInputAction,
  ICreateOrder,
  IAddBreakStart,
  PauseOrderAction,
  IAddBreakEnd,
  ResumeOrderAction,
  OpenFinishModalAction,
  OpenDeleteModalAction,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import "./OrderButtonsStyle.scss";

interface IOrderButtonsProps {
  orderNumber?: string | null;
  _line?: string | null;
  existingOrder?: OrderType;
  menu: MenuDataType;
  isPaused: boolean;
  isRunning: boolean;
  readerInputState: {
    isDisabled: boolean;
  };
  enableReaderInput: () => EnableReaderInputAction;
  disableReaderInput: () => DisableReaderInputAction;
  createOrder: ({
    orderNumber,
    quantity,
    partNumber,
    qrCode,
    customer,
  }: ICreateOrder) => void;
  addBreakStart: ({ orderNumber, _line }: IAddBreakStart) => void;
  pauseOrder: () => PauseOrderAction;
  addBreakEnd: ({ orderNumber, _line }: IAddBreakEnd) => void;
  resumeOrder: () => ResumeOrderAction;
  openFinishModal: () => OpenFinishModalAction;
  openDeleteModal: () => OpenDeleteModalAction;
}

class OrderButtons extends Component<IOrderButtonsProps> {
  componentDidUpdate(prevProps: IOrderButtonsProps) {
    if (this.props.existingOrder !== prevProps.existingOrder) {
      if (
        this.returnOrderRunningStatus() &&
        this.props.existingOrder?.orderStatus !== "closed"
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
    } else return false;
  }

  createNewOrder() {
    if (this.props.menu) {
      const orders = this.props.menu.menuContent;

      const filteredOrders = orders.filter(
        (order) => order.orderNumber === this.props.orderNumber
      );

      const details = filteredOrders[0];

      const { orderNumber, quantity, partNumber, qrCode, customer } = details;

      const orderInfo = {
        orderNumber,
        quantity,
        partNumber,
        qrCode,
        customer,
      };

      this.props.createOrder(orderInfo);
    }
  }

  beginNewBreak() {
    const { orderNumber, _line, addBreakStart, pauseOrder } = this.props;
    addBreakStart({ orderNumber, _line });
    pauseOrder();
  }

  endCurrentBreak() {
    const { orderNumber, _line, addBreakEnd, resumeOrder } = this.props;
    addBreakEnd({ orderNumber, _line });
    resumeOrder();
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

  renderStartPauseResumeButtons(orderRunningStatus: boolean) {
    if (!this.props.existingOrder || this.props.existingOrder._id === "") {
      return (
        <button
          className="btn-v3 btn-v3--accent"
          onClick={this.handleStartClick}
        >
          START
        </button>
      );
    }

    const { orderStatus } = this.props.existingOrder;
    if (orderStatus !== "closed") {
      if (orderRunningStatus) {
        return (
          <button
            className="btn-v3 btn-v3--accent"
            onClick={this.handlePauseClick}
          >
            PAUSE
          </button>
        );
      } else {
        return (
          <button
            className="btn-v3 btn-v3--accent"
            onClick={this.handleResumeClick}
          >
            RESUME
          </button>
        );
      }
    } else {
      return (
        <div className="order-completed-v3">
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
            className="btn-v3 btn-v3--finish"
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
          className="btn-v3 btn-v3--delete"
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
        <div className="order-buttons-v3">
          <div className="order-buttons-v3__row">
            {this.renderStartPauseResumeButtons(
              this.returnOrderRunningStatus()
            )}
          </div>
          <div className="order-buttons-v3__row">
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

function mapStateToProps(state: StoreState) {
  return {
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    _line: state.scanner.pickedLine || localStorage.getItem("line"),
    existingOrder: state.scanner.existingOrder,
    menu: state.scanner.menu,
    isPaused: state.scanner.isPaused,
    isRunning: state.scanner.isRunning,
    readerInputState: state.scanner.readerInputState,
  };
}
export default connect(mapStateToProps, actions)(OrderButtons);
