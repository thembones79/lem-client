import { ActionTypes } from "../../actions";

export type CloseModalAction = {
  type: ActionTypes.CLOSE_MODAL;
};

export const closeModal = (callbackOnClose?: () => void): CloseModalAction => {
  if (callbackOnClose) {
    callbackOnClose();
  }
  return { type: ActionTypes.CLOSE_MODAL };
};
