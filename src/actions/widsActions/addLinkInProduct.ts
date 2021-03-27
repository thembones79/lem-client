import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, ProductType } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IAddLinkInProduct {
  fileName: string;
  description: string;
  partNumber: string;
}

export type AddLinkInProductAction = {
  type: ActionTypes.ADD_LINK_IN_PRODUCT;
  payload: ProductType;
};

export type AddLinkInProductActionError = {
  type: ActionTypes.ADD_LINK_IN_PRODUCT_ERROR;
  payload: string;
};

export const addLinkInProduct = ({
  fileName,
  description,
  partNumber,
}: IAddLinkInProduct) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/api/product/link`,
      {
        partNumber: partNumber.trim(),
        description: description.trim(),
        fileName: fileName.trim(),
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<AddLinkInProductAction>({
      type: ActionTypes.ADD_LINK_IN_PRODUCT,
      payload: response.data.existingProduct,
    });
  } catch (e) {
    dispatch<AddLinkInProductActionError>({
      type: ActionTypes.ADD_LINK_IN_PRODUCT_ERROR,
      payload: e.response.data.error,
    });
  }
};
