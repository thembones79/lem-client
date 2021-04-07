import { ActionTypes, IRedirection } from "../../actions";

export interface IStartEditingRedirection extends IRedirection {
  _id: string;
}

export type StartEditingRedirectionAction = {
  type: ActionTypes.START_EDITING_REDIRECTION;
  payload: IStartEditingRedirection;
};

export const startEditingRedirection = (
  initialData: IStartEditingRedirection
): StartEditingRedirectionAction => {
  return {
    type: ActionTypes.START_EDITING_REDIRECTION,
    payload: initialData,
  };
};
