import { ActionTypes } from "../../actions";

export type SetOrderPauseStatusAction = {
  type: ActionTypes.SET_ORDER_PAUSE_STATUS;
  payload: boolean;
};

export const setOrderPauseStatus = (isRunning: boolean) => {
  return {
    type: ActionTypes.SET_ORDER_PAUSE_STATUS,
    payload: isRunning,
  };
};
