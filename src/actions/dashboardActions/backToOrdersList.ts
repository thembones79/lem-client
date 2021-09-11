import { ActionTypes } from "../../actions";

export type BackToOrdersListAction = {
  type: ActionTypes.BACK_TO_ORDERS_LIST;
};

export const backToOrdersList = (): BackToOrdersListAction => {
  return {
    type: ActionTypes.BACK_TO_ORDERS_LIST,
  };
};
