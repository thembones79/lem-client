import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "..";
import { ROOT_URL, headers } from "../../config";

export enum SourceOfTruth {
  internal = "internal",
  excel = "excel",
}

export enum ComputationsBase {
  tactTime = "tactTime",
  hourlyRate = "hourlyRate",
}

export type PartnumberConfigType = {
  _id: string;
  sourceOftruth: SourceOfTruth;
  computationsBase: ComputationsBase;
  whatToShow: ComputationsBase;
};

export type GetPartnumberConfigAction = {
  type: ActionTypes.GET_PARTNUMBER_CONFIG;
  payload: PartnumberConfigType;
};

export type GetPartnumberConfigActionError = {
  type: ActionTypes.GET_PARTNUMBER_CONFIG_ERROR;
  payload: string;
};

export const getPartnumberConfig = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${ROOT_URL}/api/pnconfig`, {
      headers,
    });
    dispatch<GetPartnumberConfigAction>({
      type: ActionTypes.GET_PARTNUMBER_CONFIG,
      payload: response.data,
    });
  } catch (e: any) {
    dispatch<GetPartnumberConfigActionError>({
      type: ActionTypes.GET_PARTNUMBER_CONFIG_ERROR,
      payload: e.message,
    });
  }
};
