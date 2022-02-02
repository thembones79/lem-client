import { ActionTypes, PartnumberListType } from "..";

export type UpdatePartnumbersListAction = {
  type: ActionTypes.UPDATE_PARTNUMBERS_LIST;
  payload: PartnumberListType[];
};

export const updatePartnumbersList = (
  partnumbers: PartnumberListType[]
): UpdatePartnumbersListAction => {
  return {
    type: ActionTypes.UPDATE_PARTNUMBERS_LIST,
    payload: partnumbers,
  };
};
