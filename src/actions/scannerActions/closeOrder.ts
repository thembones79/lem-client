import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export interface ICloseOrder {
  orderNumber: string | null;
}

export type CloseOrderAction = {
  type: ActionTypes.CLOSE_ORDER;
  payload: string;
};

export type CloseOrderActionError = {
  type: ActionTypes.CLOSE_ORDER_ERROR;
  payload: string;
};

export const closeOrder =
  ({ orderNumber }: ICloseOrder) =>
  async (dispatch: Dispatch) => {
    try {
      await axios.put(
        `${ROOT_URL}/api/order/close`,
        {
          orderNumber,
        },
        {
          headers,
        }
      );
      dispatch<CloseOrderAction>({
        type: ActionTypes.CLOSE_ORDER,
        payload: "closed",
      });
    } catch (e: any) {
      dispatch<CloseOrderActionError>({
        type: ActionTypes.CLOSE_ORDER_ERROR,
        payload: e.response.data.error,
      });
    }
  };
