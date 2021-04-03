import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, RedirectionType, ProductType } from "../../actions";
import { ROOT_URL } from "../../config";

export interface RedirectionWithProducts {
  existingRedirection: RedirectionType;
  prodsWithThisRedir: ProductType[];
}

export type StartAddingProductsToRedirectionAction = {
  type: ActionTypes.START_ADDING_PRODUCTS_TO_REDIRECTION;
  payload: RedirectionWithProducts;
};

export type StartAddingProductsToRedirectionActionError = {
  type: ActionTypes.START_ADDING_PRODUCTS_TO_REDIRECTION_ERROR;
  payload: string;
};

export const startAddingProductsToRedirection = (_id: string) => async (
  dispatch: Dispatch
) => {
  try {
    const response = await axios.get(
      `${ROOT_URL}/api/redirwithprods/${_id}`,

      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<StartAddingProductsToRedirectionAction>({
      type: ActionTypes.START_ADDING_PRODUCTS_TO_REDIRECTION,
      payload: response.data,
    });
  } catch (e) {
    dispatch<StartAddingProductsToRedirectionActionError>({
      type: ActionTypes.START_ADDING_PRODUCTS_TO_REDIRECTION_ERROR,
      payload: e.response.data.error,
    });
  }
};
