import { ActionTypes, ProductType } from "../../actions";

export type UpdateProductsListAction = {
  type: ActionTypes.UPDATE_PRODUCTS_LIST;
  payload: ProductType[];
};

export const updateProductsList = (
  products: ProductType[]
): UpdateProductsListAction => {
  return {
    type: ActionTypes.UPDATE_PRODUCTS_LIST,
    payload: products,
  };
};
