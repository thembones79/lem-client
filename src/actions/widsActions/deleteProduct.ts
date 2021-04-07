import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL } from "../../config";

export type DeleteProductAction = {
  type: ActionTypes.DELETE_PRODUCT;
  payload?: string;
};

export type DeleteProductActionError = {
  type: ActionTypes.DELETE_PRODUCT_ERROR;
  payload: string;
};

export const deleteProduct = (productId?: string) => async (
  dispatch: Dispatch
) => {
  try {
    await axios.delete(`${ROOT_URL}/api/product/${productId}`, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch<DeleteProductAction>({
      type: ActionTypes.DELETE_PRODUCT,
      payload: productId,
    });
  } catch (e) {
    dispatch<DeleteProductActionError>({
      type: ActionTypes.DELETE_PRODUCT_ERROR,
      payload: "Can not delete this product",
    });
  }
};
