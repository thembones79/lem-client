import { ActionTypes } from "..";

export type OpenDeleteOrderFromStatsModalAction = {
  type: ActionTypes.OPEN_DELETE_ORDER_FROM_STATS_MODAL;
  payload: () => void;
};

export const openDeleteOrderFromStatsModal = (
  callbackOnClose: () => void
): OpenDeleteOrderFromStatsModalAction => {
  return {
    type: ActionTypes.OPEN_DELETE_ORDER_FROM_STATS_MODAL,
    payload: callbackOnClose,
  };
};
