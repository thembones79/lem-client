import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IRedirection {
  redirectFrom: string;
  redirectTo: string;
  description: string;
}

export type RedirectionType = {
  _id: string;
  description: string;
  redirRoute: string;
  targetUrl: string;
  fileName: string;
};

export type AddRedirectionAction = {
  type: ActionTypes.ADD_REDIRECTION;
  payload: RedirectionType;
};

export type AddRedirectionActionError = {
  type: ActionTypes.ADD_REDIRECTION_ERROR;
  payload: string;
};

export const addRedirection = ({
  redirectFrom,
  redirectTo,
  description,
}: IRedirection) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/api/redirection`,
      {
        redirRoute: redirectFrom.trim(),
        description: description.trim(),
        fileName: redirectTo.trim(),
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<AddRedirectionAction>({
      type: ActionTypes.ADD_REDIRECTION,
      payload: response.data,
    });
  } catch (e) {
    dispatch<AddRedirectionActionError>({
      type: ActionTypes.ADD_REDIRECTION_ERROR,
      payload: e.response.data.error,
    });
  }
};
