import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, RedirectionType } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export type GetRedirectionsAction = {
  type: ActionTypes.GET_REDIRECTIONS;
  payload: RedirectionType[];
};

export type GetRedirectionsActionError = {
  type: ActionTypes.GET_REDIRECTIONS_ERROR;
  payload: string;
};

export const getRedirections = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${ROOT_URL}/api/redirection`, {
      headers,
    });
    dispatch<GetRedirectionsAction>({
      type: ActionTypes.GET_REDIRECTIONS,
      payload: response.data.redirections,
    });
  } catch (e: any) {
    dispatch<GetRedirectionsActionError>({
      type: ActionTypes.GET_REDIRECTIONS_ERROR,
      payload: e.response.data.error,
    });
  }
};
