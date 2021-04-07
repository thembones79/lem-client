import { ActionTypes, RedirectionType } from "../../actions";

export interface IAddProductsToRedirection extends RedirectionType {}

export type AddProductsToRedirectionAction = {
  type: ActionTypes.ADD_PRODUCTS_TO_REDIRECTION;
  payload: RedirectionType;
};

export const addProductsToRedirection = (
  initialData: IAddProductsToRedirection
): AddProductsToRedirectionAction => {
  return {
    type: ActionTypes.ADD_PRODUCTS_TO_REDIRECTION,
    payload: initialData,
  };
};
