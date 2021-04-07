import { ActionTypes } from "../../actions";

export type PauseOrderAction = {
  type: ActionTypes.PAUSE_ORDER;
  payload: { isRunning: false };
};

export const pauseOrder = (): PauseOrderAction => {
  return {
    type: ActionTypes.PAUSE_ORDER,
    payload: { isRunning: false },
  };
};
