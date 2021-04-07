import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, ProductType } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IAddRedirectionInProduct {
  _redirection: string;
  partNumber: string;
}

export type AddRedirectionInProductAction = {
  type: ActionTypes.ADD_REDIRECTION_IN_PRODUCT;
  payload: ProductType;
};

export type AddRedirectionInProductActionError = {
  type: ActionTypes.ADD_REDIRECTION_IN_PRODUCT_ERROR;
  payload: string;
};

export const addRedirectionInProduct = ({
  _redirection,
  partNumber,
}: IAddRedirectionInProduct) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/api/product/redirection`,
      {
        partNumber: partNumber.trim(),
        _redirection,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<AddRedirectionInProductAction>({
      type: ActionTypes.ADD_REDIRECTION_IN_PRODUCT,
      payload: response.data.existingProduct,
    });
  } catch (e) {
    dispatch<AddRedirectionInProductActionError>({
      type: ActionTypes.ADD_REDIRECTION_IN_PRODUCT_ERROR,
      payload: e.response.data.error,
    });
  }
};
