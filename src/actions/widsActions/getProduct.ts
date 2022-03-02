import Axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { ActionTypes, ProductType } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export type GetProductBeginAction = {
  type: ActionTypes.GET_PRODUCT_BEGIN;
};

export type GetProductSuccessAction = {
  type: ActionTypes.GET_PRODUCT_SUCCESS;
  payload: ProductType;
};

export type GetProductActionError = {
  type: ActionTypes.GET_PRODUCT_ERROR;
  payload: string;
};

export const getProduct =
  (productId?: string) => async (dispatch: Dispatch) => {
    dispatch<GetProductBeginAction>({ type: ActionTypes.GET_PRODUCT_BEGIN });
    try {
      const response: AxiosResponse = await Axios.get(
        `${ROOT_URL}/api/product/${productId}`,
        {
          headers,
        }
      );
      dispatch<GetProductSuccessAction>({
        type: ActionTypes.GET_PRODUCT_SUCCESS,
        payload: response.data.existingProduct,
      });
    } catch (e: any) {
      dispatch<GetProductActionError>({
        type: ActionTypes.GET_PRODUCT_ERROR,
        payload: e.response
          ? e.response.data.error
          : "server is not responding",
      });
    }
  };
