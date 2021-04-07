import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, ProductType } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IDeleteConnectedItem {
  _id: string;
  partNumber: string;
  linksToDocs: {
    _id: string;
    description: string;
    url: string;
    fileName: string;
  }[];
  linksToRedirs: {
    _id: string;
  }[];
}

export type DeleteConnectedLinkItemAction = {
  type: ActionTypes.DELETE_CONNECTED_LINK_ITEM;
  payload: ProductType;
};

export type DeleteConnectedLinkItemActionError = {
  type: ActionTypes.DELETE_CONNECTED_LINK_ITEM_ERROR;
  payload: string;
};

export const deleteConnectedLinkItem = ({
  _id,
  partNumber,
  linksToDocs,
  linksToRedirs,
}: IDeleteConnectedItem) => async (dispatch: Dispatch) => {
  try {
    const filteredLinksToDocs = linksToDocs.filter((link) => link._id !== _id);
    const response = await axios.put(
      `${ROOT_URL}/api/product`,
      {
        partNumber,
        linksToDocs: filteredLinksToDocs,
        linksToRedirs,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<DeleteConnectedLinkItemAction>({
      type: ActionTypes.DELETE_CONNECTED_LINK_ITEM,
      payload: response.data.existingProduct,
    });
  } catch (e) {
    dispatch<DeleteConnectedLinkItemActionError>({
      type: ActionTypes.DELETE_CONNECTED_LINK_ITEM_ERROR,
      payload: e.response.data.error,
    });
  }
};
