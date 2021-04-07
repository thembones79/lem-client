import { ActionTypes } from "../../actions";

export type OpenFinishModalAction = {
  type: ActionTypes.OPEN_FINISH_MODAL;
};

export const openFinishModal = (): OpenFinishModalAction => {
  return { type: ActionTypes.OPEN_FINISH_MODAL };
};
