import { ActionTypes } from "../../actions";

export type StartAddingProductAction = {
  type: ActionTypes.START_ADDING_PRODUCT;
};

export const startAddingProduct = (): StartAddingProductAction => {
  return {
    type: ActionTypes.START_ADDING_PRODUCT,
  };
};
