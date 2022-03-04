import { ActionTypes } from "..";

export type UpdateGivenTactTimeAction = {
  type: ActionTypes.UPDATE_GIVEN_TACT_TIME;
  payload: string;
};

export const updateGivenTactTime = (
  givenTactTime: string
): UpdateGivenTactTimeAction => {
  return {
    type: ActionTypes.UPDATE_GIVEN_TACT_TIME,
    payload: givenTactTime,
  };
};
