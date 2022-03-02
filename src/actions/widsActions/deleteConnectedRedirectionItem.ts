import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, ProductType, IDeleteConnectedItem } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export type DeleteConnectedRedirectionItemAction = {
  type: ActionTypes.DELETE_CONNECTED_REDIRECTION_ITEM;
  payload: ProductType;
};

export type DeleteConnectedRedirectionItemActionError = {
  type: ActionTypes.DELETE_CONNECTED_REDIRECTION_ITEM_ERROR;
  payload: string;
};

export const deleteConnectedRedirectionItem =
  ({ _id, partNumber, linksToDocs, linksToRedirs }: IDeleteConnectedItem) =>
  async (dispatch: Dispatch) => {
    try {
      const filteredLinksToRedirs = linksToRedirs.filter(
        (redir) => redir._id !== _id
      );
      const response = await axios.put(
        `${ROOT_URL}/api/product`,
        {
          partNumber,
          linksToDocs,
          linksToRedirs: filteredLinksToRedirs,
        },
        {
          headers,
        }
      );
      dispatch<DeleteConnectedRedirectionItemAction>({
        type: ActionTypes.DELETE_CONNECTED_REDIRECTION_ITEM,
        payload: response.data.existingProduct,
      });
    } catch (e: any) {
      dispatch<DeleteConnectedRedirectionItemActionError>({
        type: ActionTypes.DELETE_CONNECTED_REDIRECTION_ITEM_ERROR,
        payload: e.response.data.error,
      });
    }
  };
