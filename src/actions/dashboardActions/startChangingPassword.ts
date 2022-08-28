import { ActionTypes } from "../../actions";

export type StartChangingPasswordAction = {
  type: ActionTypes.START_CHANGING_PASSWORD;
  payload: string;
};

export const startChangingPassword = (userId:string): StartChangingPasswordAction => {
  return {
    type: ActionTypes.START_CHANGING_PASSWORD,
    payload: userId,
  };
};



