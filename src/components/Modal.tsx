import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import { StoreState } from "../reducers";
import { IModalState } from "../reducers/modalReducer";
import "./ModalStyle.scss";

interface IModalProps extends IModalState {
  orderNumber: string | null;
  closeModal: () => actions.CloseModalAction;
  closeOrder: ({ orderNumber }: actions.ICloseOrder) => void;
  deleteOrder: ({ orderNumber }: actions.IDeleteOrder) => void;
  deleteRedirection: (redirectionId?: string) => void;
  deleteProduct: (productId?: string) => void;
}

class Modal extends Component<IModalProps> {
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

      case "delete product":
        this.handleDeleteProductClick();
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

  handleDeleteProductClick = () => {
    const { productId } = this.props;
    this.props.deleteProduct(productId);
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

function mapStateToProps(state: StoreState) {
  return {
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    isModalOpened: state.modal.isModalOpened,
    modalHeader: state.modal.modalHeader,
    modalContent: state.modal.modalContent,
    modalAction: state.modal.modalAction,
    redirectionId: state.modal.redirectionId,
    productId: state.modal.productId,
  };
}
export default connect(mapStateToProps, actions)(Modal);
