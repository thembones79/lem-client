import { ActionTypes } from "../../actions";

export type ViewOrderDetailsAction = {
  type: ActionTypes.VIEW_ORDER_DETAILS;
  payload: string;
};

export const viewOrderDetails = (_id: string): ViewOrderDetailsAction => {
  return {
    type: ActionTypes.VIEW_ORDER_DETAILS,
    payload: _id,
  };
};
