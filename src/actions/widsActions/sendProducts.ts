import { ActionTypes, ProductType } from "../../actions";

export type SendProductsAction = {
  type: ActionTypes.SEND_PRODUCTS;
  payload: ProductType[];
};

export const sendProducts = (
  productList: ProductType[]
): SendProductsAction => {
  return {
    type: ActionTypes.SEND_PRODUCTS,
    payload: productList,
  };
};
