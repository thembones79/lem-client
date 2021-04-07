import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IUpdateManyProdsWithOneRedir {
  redirectionId: string;
  productListWithDots: string[];
}

export type UpdateManyProdsWithOneRedirAction = {
  type: ActionTypes.UPDATE_MANY_PRODS_WITH_ONE_REDIR;
};

export type UpdateManyProdsWithOneRedirActionError = {
  type: ActionTypes.UPDATE_MANY_PRODS_WITH_ONE_REDIR_ERROR;
  payload: string;
};

export const updateManyProdsWithOneRedir = ({
  redirectionId,
  productListWithDots,
}: IUpdateManyProdsWithOneRedir) => async (dispatch: Dispatch) => {
  try {
    await axios.put(
      `${ROOT_URL}/api/product/redirection/${redirectionId}`,
      {
        productList: productListWithDots,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<UpdateManyProdsWithOneRedirAction>({
      type: ActionTypes.UPDATE_MANY_PRODS_WITH_ONE_REDIR,
    });
  } catch (e) {
    dispatch<UpdateManyProdsWithOneRedirActionError>({
      type: ActionTypes.UPDATE_MANY_PRODS_WITH_ONE_REDIR_ERROR,
      payload: e.response.data.error,
    });
  }
};
