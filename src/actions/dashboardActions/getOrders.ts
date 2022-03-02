import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "..";
import { ROOT_URL, headers } from "../../config";

export type OrderListType = {
  orderNumber: string;
  _id: string;
  partNumber: string;
  orderStatus: string;
  quantity: number;
  orderAddedAt: string;
  lastValidScan: string;
  scansAlready: number;
  validScans: number;
  linesUsed: string;
};

export type GetOrdersBeginAction = {
  type: ActionTypes.GET_ORDERS_BEGIN;
};

export type GetOrdersSuccessAction = {
  type: ActionTypes.GET_ORDERS_SUCCESS;
  payload: OrderListType[];
};

export type GetOrdersActionError = {
  type: ActionTypes.GET_ORDERS_ERROR;
  payload: string;
};

export const getOrders = () => async (dispatch: Dispatch) => {
  dispatch<GetOrdersBeginAction>({
    type: ActionTypes.GET_ORDERS_BEGIN,
  });
  try {
    const response = await axios.get(`${ROOT_URL}/api/orders/stats`, {
      headers,
    });
    dispatch<GetOrdersSuccessAction>({
      type: ActionTypes.GET_ORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (e: any) {
    dispatch<GetOrdersActionError>({
      type: ActionTypes.GET_ORDERS_ERROR,
      payload: e.response ? e.response.data.error : "server is not responding",
    });
  }
};
