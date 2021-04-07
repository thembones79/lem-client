import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, RedirectionType } from "../../actions";
import { ROOT_URL } from "../../config";

export type ProductType = {
  _id: string;
  partNumber: string;
  linksToDocs: {
    _id: string;
    description: string;
    url: string;
    fileName: string;
  }[];
  tactTime: number;
  linksToRedirs: RedirectionType[];
};

export interface IAddProduct {
  partNumber: string;
}

export type AddProductAction = {
  type: ActionTypes.ADD_PRODUCT;
  payload: ProductType;
};

export type AddProductActionError = {
  type: ActionTypes.ADD_PRODUCT_ERROR;
  payload: string;
};

export const addProduct = ({ partNumber }: IAddProduct) => async (
  dispatch: Dispatch
) => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/api/product`,
      {
        partNumber: partNumber.trim(),
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<AddProductAction>({
      type: ActionTypes.ADD_PRODUCT,
      payload: response.data.product,
    });
  } catch (e) {
    dispatch<AddProductActionError>({
      type: ActionTypes.ADD_PRODUCT_ERROR,
      payload: e.response.data.error,
    });
  }
};
