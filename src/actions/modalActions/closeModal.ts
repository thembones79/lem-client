import { ActionTypes } from "../../actions";

export type CloseModalAction = {
  type: ActionTypes.CLOSE_MODAL;
};

export const closeModal = (): CloseModalAction => {
  return { type: ActionTypes.CLOSE_MODAL };
};
