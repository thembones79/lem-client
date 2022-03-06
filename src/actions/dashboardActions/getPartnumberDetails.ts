import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, PartnumberType } from "..";
import { ROOT_URL, headers } from "../../config";

export type GetPartnumberDetailsBeginAction = {
  type: ActionTypes.GET_PARTNUMBER_DETAILS_BEGIN;
};

export type GetPartnumberDetailsSuccessAction = {
  type: ActionTypes.GET_PARTNUMBER_DETAILS_SUCCESS;
  payload: PartnumberType;
};

export type GetPartnumberDetailsActionError = {
  type: ActionTypes.GET_PARTNUMBER_DETAILS_ERROR;
  payload: string;
};

export const getPartnumberDetails =
  (partnumberId?: string) => async (dispatch: Dispatch) => {
    dispatch<GetPartnumberDetailsBeginAction>({
      type: ActionTypes.GET_PARTNUMBER_DETAILS_BEGIN,
    });
    try {
      const response = await axios.get(
        `${ROOT_URL}/api/product/statistics/${partnumberId}`,
        {
          headers,
        }
      );
      dispatch<GetPartnumberDetailsSuccessAction>({
        type: ActionTypes.GET_PARTNUMBER_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch<GetPartnumberDetailsActionError>({
        type: ActionTypes.GET_PARTNUMBER_DETAILS_ERROR,
        payload: e.response
          ? e.response.data.error
          : "server is not responding",
      });
    }
  };
