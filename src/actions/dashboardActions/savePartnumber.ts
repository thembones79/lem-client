import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, PartnumberType } from "..";
import { ROOT_URL, headers } from "../../config";

export type SavePartnumberAction = {
  type: ActionTypes.SAVE_PARTNUMBER;
  payload: PartnumberType;
};

export type SavePartnumberActionError = {
  type: ActionTypes.SAVE_PARTNUMBER_ERROR;
  payload: string;
};

export const savePartnumber =
  (
    { givenHourlyRate, givenTactTime, cleanRoomTime }: PartnumberType,
    id: string
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(
        `${ROOT_URL}/api/product/statistics/${id}`,
        {
          givenHourlyRate,
          givenTactTime,
          cleanRoomTime,
        },
        {
          headers,
        }
      );
      dispatch<SavePartnumberAction>({
        type: ActionTypes.SAVE_PARTNUMBER,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch<SavePartnumberActionError>({
        type: ActionTypes.SAVE_PARTNUMBER_ERROR,
        payload: e.response.data.error,
      });
    }
  };
