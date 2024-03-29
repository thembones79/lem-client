import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export type FetchMessageAction = {
  type: ActionTypes.FETCH_MESSAGE;
  payload: {
    message: string;
    user: {
      firstname: string;
      email: string;
      type: string;
      _id: string;
    };
  };
};

export const fetchMessage = () => {
  return function (dispatch: Dispatch) {
    axios
      .get(ROOT_URL, {
        headers,
      })
      .then((response) => {
        dispatch<FetchMessageAction>({
          type: ActionTypes.FETCH_MESSAGE,
          payload: response.data,
        });
      });
  };
};
