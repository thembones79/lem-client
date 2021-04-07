import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, IRedirection, RedirectionType } from "../../actions";
import { ROOT_URL } from "../../config";

export type SaveRedirectionAction = {
  type: ActionTypes.SAVE_REDIRECTION;
  payload: RedirectionType;
};

export type SaveRedirectionActionError = {
  type: ActionTypes.SAVE_REDIRECTION_ERROR;
  payload: string;
};

export const saveRedirection = (
  { redirectFrom, redirectTo, description }: IRedirection,
  id: string
) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.put(
      `${ROOT_URL}/api/redirection/${id}`,
      {
        redirRoute: redirectFrom.trim(),
        description: description.trim(),
        fileName: redirectTo.trim(),
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<SaveRedirectionAction>({
      type: ActionTypes.SAVE_REDIRECTION,
      payload: response.data,
    });
  } catch (e) {
    dispatch<SaveRedirectionActionError>({
      type: ActionTypes.SAVE_REDIRECTION_ERROR,
      payload: e.response.data.error,
    });
  }
};
