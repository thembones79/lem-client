import { ActionTypes } from "..";

export type UpdateGivenHourlyRateAction = {
  type: ActionTypes.UPDATE_GIVEN_HOURLY_RATE;
  payload: string;
};

export const updateGivenHourlyRate = (
  givenHourlyRate: string
): UpdateGivenHourlyRateAction => {
  return {
    type: ActionTypes.UPDATE_GIVEN_HOURLY_RATE,
    payload: givenHourlyRate,
  };
};
