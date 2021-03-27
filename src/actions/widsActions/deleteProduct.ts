import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IProductID {
  _id: string;
}

export type DeleteProductAction = {
  type: ActionTypes.DELETE_PRODUCT;
  payload: IProductID;
};

export type DeleteProductActionError = {
  type: ActionTypes.DELETE_PRODUCT_ERROR;
  payload: string;
};

export const deleteProduct = (_id: IProductID) => async (
  dispatch: Dispatch
) => {
  try {
    await axios.delete(`${ROOT_URL}/api/product/${_id}`, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch<DeleteProductAction>({
      type: ActionTypes.DELETE_PRODUCT,
      payload: _id,
    });
  } catch (e) {
    dispatch<DeleteProductActionError>({
      type: ActionTypes.DELETE_PRODUCT_ERROR,
      payload: "Can not delete this product",
    });
  }
};
