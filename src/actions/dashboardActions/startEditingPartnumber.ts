import { ActionTypes, PartnumberType } from "..";

export type StartEditingPartnumberAction = {
  type: ActionTypes.START_EDITING_PARTNUMBER;
  payload: PartnumberType;
};

export const startEditingPartnumber = (
  initialData: PartnumberType
): StartEditingPartnumberAction => {
  return {
    type: ActionTypes.START_EDITING_PARTNUMBER,
    payload: initialData,
  };
};
