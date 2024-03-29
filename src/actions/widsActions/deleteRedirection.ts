import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export type DeleteRedirectionAction = {
  type: ActionTypes.DELETE_REDIRECTION;
  payload?: string;
};

export type DeleteRedirectionActionError = {
  type: ActionTypes.DELETE_REDIRECTION_ERROR;
  payload: string;
};

export const deleteRedirection =
  (redirectionId?: string) => async (dispatch: Dispatch) => {
    try {
      await axios.delete(`${ROOT_URL}/api/redirection/${redirectionId}`, {
        headers,
      });
      dispatch<DeleteRedirectionAction>({
        type: ActionTypes.DELETE_REDIRECTION,
        payload: redirectionId,
      });
    } catch (e: any) {
      dispatch<DeleteRedirectionActionError>({
        type: ActionTypes.DELETE_REDIRECTION_ERROR,
        payload: "Can not delete this redirection",
      });
    }
  };
