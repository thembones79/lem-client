import {
  OPEN_FINISH_MODAL,
  CLOSE_MODAL,
  OPEN_DELETE_MODAL,
  OPEN_DELETE_REDIRECTION_MODAL,
  OPEN_DELETE_PRODUCT_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  isModalOpened: false,
  modalHeader: "",
  modalContent: "",
  modalAction: "",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_FINISH_MODAL:
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

    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpened: false,
        modalHeader: "",
        modalContent: "",
        modalAction: "",
      };

    case OPEN_DELETE_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to delete this order?",
        modalContent: `It can't be undone! So, if you are really 100% sure,
           smash the “YES…” button`,
        modalAction: "delete",
      };

    case OPEN_DELETE_REDIRECTION_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to delete this redirection?",
        modalContent: `It can't be undone! So, if you are really 100% sure,
               smash the “YES…” button`,
        modalAction: "delete redirection",
        redirectionId: action.payload,
      };

    case OPEN_DELETE_PRODUCT_MODAL:
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
}
