import { ActionTypes } from "..";

export type ConfigurePartnumbersAction = {
  type: ActionTypes.CONFIGURE_PARTNUMBERS;
};

export const configurePartnumbers = (): ConfigurePartnumbersAction => {
  console.log("config");
  return {
    type: ActionTypes.CONFIGURE_PARTNUMBERS,
  };
};
