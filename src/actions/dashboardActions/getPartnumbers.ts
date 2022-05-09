import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "..";
import { ROOT_URL, headers } from "../../config";

export type PartnumberType = {
  _id: string;
  givenHourlyRate: number;
  suggestedHourlyRate: number;
  cleanRoomTime: number;
  givenTactTime: number;
  suggestedTactTime: number;
  xlsxTactTime: number;
  automatic: boolean;
  partNumber: string;
};

export type GetPartnumbersBeginAction = {
  type: ActionTypes.GET_PARTNUMBERS_BEGIN;
};

export type GetPartnumbersSuccessAction = {
  type: ActionTypes.GET_PARTNUMBERS_SUCCESS;
  payload: PartnumberType[];
};

export type GetPartnumbersActionError = {
  type: ActionTypes.GET_PARTNUMBERS_ERROR;
  payload: string;
};

export const getPartnumbers = () => async (dispatch: Dispatch) => {
  dispatch<GetPartnumbersBeginAction>({
    type: ActionTypes.GET_PARTNUMBERS_BEGIN,
  });
  try {
    const response = await axios.get(`${ROOT_URL}/api/product/statistics`, {
      headers,
    });
    dispatch<GetPartnumbersSuccessAction>({
      type: ActionTypes.GET_PARTNUMBERS_SUCCESS,
      payload: response.data,
    });
  } catch (e: any) {
    dispatch<GetPartnumbersActionError>({
      type: ActionTypes.GET_PARTNUMBERS_ERROR,
      payload: e.response ? e.response.data.error : "server is not responding",
    });
  }
};
