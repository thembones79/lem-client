import { ActionTypes } from "../../actions";

export interface IStartEditingProduct {
  partNumber: string;
  _id: string;
}

export type StartEditingProductAction = {
  type: ActionTypes.START_EDITING_PRODUCT;
  payload: IStartEditingProduct;
};

export const startEditingProduct = (
  initialData: IStartEditingProduct
): StartEditingProductAction => {
  return {
    type: ActionTypes.START_EDITING_PRODUCT,
    payload: initialData,
  };
};
