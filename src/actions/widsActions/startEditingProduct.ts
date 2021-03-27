import { ActionTypes, ProductType } from "../../actions";

export type StartEditingProductAction = {
  type: ActionTypes.START_EDITING_PRODUCT;
  payload: ProductType;
};

export const startEditingProduct = (
  initialData: ProductType
): StartEditingProductAction => {
  return {
    type: ActionTypes.START_EDITING_PRODUCT,
    payload: initialData,
  };
};
