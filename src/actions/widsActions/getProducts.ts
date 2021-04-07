import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, ProductType } from "../../actions";
import { ROOT_URL } from "../../config";

export type GetProductsAction = {
  type: ActionTypes.GET_PRODUCTS;
  payload: ProductType[];
};

export type GetProductsActionError = {
  type: ActionTypes.GET_PRODUCTS_ERROR;
  payload: string;
};

export const getProducts = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${ROOT_URL}/api/product`, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch<GetProductsAction>({
      type: ActionTypes.GET_PRODUCTS,
      payload: response.data.products,
    });
  } catch (e) {
    dispatch<GetProductsActionError>({
      type: ActionTypes.GET_PRODUCTS_ERROR,
      payload: e.response ? e.response.data.error : "server is not responding",
    });
  }
};
