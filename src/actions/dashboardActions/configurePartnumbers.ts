import { ActionTypes } from "..";

export type ConfigurePartnumbersAction = {
  type: ActionTypes.CONFIGURE_PARTNUMBERS;
};

export const configurePartnumbers = (): ConfigurePartnumbersAction => {
  return {
    type: ActionTypes.CONFIGURE_PARTNUMBERS,
  };
};
