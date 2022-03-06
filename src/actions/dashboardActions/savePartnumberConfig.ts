import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, PartnumberConfigType } from "..";
import { ROOT_URL, headers } from "../../config";

export type SavePartnumberConfigAction = {
  type: ActionTypes.SAVE_PARTNUMBER_CONFIG;
  payload: PartnumberConfigType;
};

export type SavePartnumberConfigActionError = {
  type: ActionTypes.SAVE_PARTNUMBER_CONFIG_ERROR;
  payload: string;
};

export const savePartnumberConfig =
  ({ sourceOftruth, computationsBase }: PartnumberConfigType) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(
        `${ROOT_URL}/api/pnconfig`,
        {
          sourceOftruth,
          computationsBase,
        },
        {
          headers,
        }
      );
      dispatch<SavePartnumberConfigAction>({
        type: ActionTypes.SAVE_PARTNUMBER_CONFIG,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch<SavePartnumberConfigActionError>({
        type: ActionTypes.SAVE_PARTNUMBER_CONFIG_ERROR,
        payload: e.response.data.error,
      });
    }
  };
