import { ModalAction, ActionTypes } from "../actions";

export interface IModalState {
  isModalOpened?: boolean;
  modalHeader?: string;
  modalContent?: string;
  modalAction?:
    | "finish"
    | "delete"
    | "delete redirection"
    | "delete product"
    | "";
  redirectionId?: string;
  productId?: string;
}

const MODAL_INITIAL_STATE: IModalState = {
  isModalOpened: false,
  modalHeader: "",
  modalContent: "",
  modalAction: "",
  redirectionId: "",
  productId: "",
};

export const modalReducer = (
  state = MODAL_INITIAL_STATE,
  action: ModalAction
) => {
  switch (action.type) {
    case ActionTypes.OPEN_FINISH_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to finish/close this order?",
        modalContent: `finished/closed orders cannot be re-opened!

        if you want to add some scans into this order - use “PAUSE”
        instead
        of “finish”`,
        modalAction: "finish",
      };

    case ActionTypes.CLOSE_MODAL:
      return {
        ...state,
        isModalOpened: false,
        modalHeader: "",
        modalContent: "",
        modalAction: "",
      };

    case ActionTypes.OPEN_DELETE_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to delete this order?",
        modalContent: `It can't be undone! So, if you are really 100% sure,
           smash the “YES…” button`,
        modalAction: "delete",
      };

    case ActionTypes.OPEN_DELETE_REDIRECTION_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to delete this redirection?",
        modalContent: `It can't be undone! So, if you are really 100% sure,
               smash the “YES…” button`,
        modalAction: "delete redirection",
        redirectionId: action.payload,
      };

    case ActionTypes.OPEN_DELETE_PRODUCT_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to delete this product?",
        modalContent: `It can't be undone! So, if you are really 100% sure,
                 smash the “YES…” button`,
        modalAction: "delete product",
        productId: action.payload,
      };

    default:
      return state;
  }
};
