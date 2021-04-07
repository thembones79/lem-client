import { ActionTypes } from "../../actions";

export type StartAddingRedirectionAction = {
  type: ActionTypes.START_ADDING_REDIRECTION;
};

export const startAddingRedirection = (): StartAddingRedirectionAction => {
  return {
    type: ActionTypes.START_ADDING_REDIRECTION,
  };
};
