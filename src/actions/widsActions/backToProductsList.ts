import { ActionTypes } from "../../actions";

export type BackToProductsListAction = {
  type: ActionTypes.BACK_TO_PRODUCTS_LIST;
};

export const backToProductsList = (): BackToProductsListAction => {
  return {
    type: ActionTypes.BACK_TO_PRODUCTS_LIST,
  };
};
