import { ActionTypes } from "../../actions";

export type StartAddingUserAction = {
  type: ActionTypes.START_ADDING_USER;
};

export const startAddingUser = (): StartAddingUserAction => {
  return {
    type: ActionTypes.START_ADDING_USER,
  };
};
