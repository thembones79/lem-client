import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, IRedirectionID } from "../../actions";
import { ROOT_URL } from "../../config";

export type DeleteRedirectionAction = {
  type: ActionTypes.DELETE_REDIRECTION;
  payload: IRedirectionID;
};

export type DeleteRedirectionActionError = {
  type: ActionTypes.DELETE_REDIRECTION_ERROR;
  payload: string;
};

export const deleteRedirection = (_id: IRedirectionID) => async (
  dispatch: Dispatch
) => {
  try {
    await axios.delete(`${ROOT_URL}/api/redirection/${_id}`, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch<DeleteRedirectionAction>({
      type: ActionTypes.DELETE_REDIRECTION,
      payload: _id,
    });
  } catch (e) {
    dispatch<DeleteRedirectionActionError>({
      type: ActionTypes.DELETE_REDIRECTION_ERROR,
      payload: "Can not delete this redirection",
    });
  }
};
