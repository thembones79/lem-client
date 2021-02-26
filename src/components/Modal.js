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

      case "delete redirection":
        this.handleDeleteRedirectionClick();
        break;

      default:
        return;
    }
  };

  handleFinishClick = () => {
    const { orderNumber } = this.props;
    this.props.closeOrder({ orderNumber });
    this.props.closeModal();
  };

  handleDeleteClick = () => {
    const { orderNumber } = this.props;
    this.props.deleteOrder({ orderNumber });
    this.props.closeModal();
  };

  handleDeleteRedirectionClick = () => {
    const { redirectionId } = this.props;
    this.props.deleteRedirection(redirectionId);
    this.props.closeModal();
  };

  handleCancelClick = () => {
    this.props.closeModal();
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
              className={`btn ${
                modalAction === "finish" ? "btn--" + modalAction : "btn--delete"
              }`}
              onClick={this.handleActionClick}
            >
              YES, {modalAction}
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
    isModalOpened: state.modal.isModalOpened,
    modalHeader: state.modal.modalHeader,
    modalContent: state.modal.modalContent,
    modalAction: state.modal.modalAction,
    redirectionId: state.wids.redirectionId,
  };
}
export default connect(mapStateToProps, actions)(Modal);
