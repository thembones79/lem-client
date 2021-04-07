import { ActionTypes } from "../../actions";

export type BackToRedirectionsListAction = {
  type: ActionTypes.BACK_TO_REDIRECTIONS_LIST;
};

export const backToRedirectionsList = (): BackToRedirectionsListAction => {
  return {
    type: ActionTypes.BACK_TO_REDIRECTIONS_LIST,
  };
};
