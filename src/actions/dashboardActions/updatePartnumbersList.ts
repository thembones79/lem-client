import { ActionTypes, PartnumberType } from "..";

export type UpdatePartnumbersListAction = {
  type: ActionTypes.UPDATE_PARTNUMBERS_LIST;
  payload: PartnumberType[];
};

export const updatePartnumbersList = (
  partnumbers: PartnumberType[]
): UpdatePartnumbersListAction => {
  return {
    type: ActionTypes.UPDATE_PARTNUMBERS_LIST,
    payload: partnumbers,
  };
};
