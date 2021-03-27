import { ActionTypes } from "../../actions";

export type SetMessageAction = {
  type: ActionTypes.SET_MESSAGE;
  payload: string;
};

export const setMessage = (message: string): SetMessageAction => {
  return {
    type: ActionTypes.SET_MESSAGE,
    payload: message,
  };
};
