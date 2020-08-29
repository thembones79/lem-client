import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import "./ModalStyle.scss";

class Modal extends Component {
  handleActionClick = () => {
    const { modalAction } = this.props;
    switch (modalAction) {
      case "finish":
        this.handleFinishClick();
        break;

      case "delete":
        this.handleDeleteClick();
        break;

      default:
        return;
    }
  };

  handleFinishClick = () => {
    const { orderNumber } = this.props;
    this.props.closeOrder({ orderNumber });
    this.props.closeFinishModal();
  };

  handleDeleteClick = () => {
    const { orderNumber } = this.props;
    this.props.deleteOrder({ orderNumber });
    this.props.closeFinishModal();
  };

  handleCancelClick = () => {
    this.props.closeFinishModal();
  };

  render() {
    const {
      isModalOpened,
      modalHeader,
      modalContent,
      modalAction,
    } = this.props;
    return (
      <div
        className={`modal ${isModalOpened ? "modal--active" : ""}`}
        onClick={this.handleCancelClick}
      >
        <div className="modal__card" onClick={(e) => e.stopPropagation()}>
          <div className="modal__card__header">{modalHeader}</div>
          <div className="modal__card__content">{modalContent}</div>
          <div className="modal__card__buttons">
            <button
              className={`btn ${modalAction ? "btn--" + modalAction : ""}`}
              onClick={this.handleActionClick}
            >
              YES, {modalAction} it
            </button>
            <button
              className={`btn btn--cancel`}
              onClick={this.handleCancelClick}
            >
              NO, take me back
            </button>
          </div>
        </div>
      </div>
    );
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
    isModalOpened: state.scanner.isModalOpened,
    modalHeader: state.scanner.modalHeader,
    modalContent: state.scanner.modalContent,
    modalAction: state.scanner.modalAction,
  };
}
export default connect(mapStateToProps, actions)(Modal);
