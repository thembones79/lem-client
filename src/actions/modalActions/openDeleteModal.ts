import { ActionTypes } from "../../actions";

export type OpenDeleteModalAction = {
  type: ActionTypes.OPEN_DELETE_MODAL;
};

export const openDeleteModal = (): OpenDeleteModalAction => {
  return { type: ActionTypes.OPEN_DELETE_MODAL };
};
