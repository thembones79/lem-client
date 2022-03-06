import { ActionTypes } from "..";

export type BackToPartnumbersListAction = {
  type: ActionTypes.BACK_TO_PARTNUMBERS_LIST;
};

export const backToPartnumbersList = (): BackToPartnumbersListAction => {
  return {
    type: ActionTypes.BACK_TO_PARTNUMBERS_LIST,
  };
};
