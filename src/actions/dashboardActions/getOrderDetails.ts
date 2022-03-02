import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, OrderListType } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export type ScanDetailsType = {
  scansLine: string;
  scansSum: number;
  scansTimestamps: string[];
};

export type HourlyRatesType = {
  dateHour: string;
  scanDetails: ScanDetailsType[];
};

export type OrderDetailsType = OrderListType & {
  netTime: string;
  meanCycleTime: string;
  meanHourlyRate: number;
  meanGrossHourlyRate: number;
  givenHourlyRate: number;
  hourlyRates: HourlyRatesType[];
};

export type GetOrderDetailsBeginAction = {
  type: ActionTypes.GET_ORDER_DETAILS_BEGIN;
};

export type GetOrderDetailsSuccessAction = {
  type: ActionTypes.GET_ORDER_DETAILS_SUCCESS;
  payload: OrderDetailsType;
};

export type GetOrderDetailsActionError = {
  type: ActionTypes.GET_ORDER_DETAILS_ERROR;
  payload: string;
};

export const getOrderDetails =
  (orderId?: string) => async (dispatch: Dispatch) => {
    dispatch<GetOrderDetailsBeginAction>({
      type: ActionTypes.GET_ORDER_DETAILS_BEGIN,
    });
    try {
      const response = await axios.get(
        `${ROOT_URL}/api/order/stats/${orderId}`,
        {
          headers,
        }
      );
      dispatch<GetOrderDetailsSuccessAction>({
        type: ActionTypes.GET_ORDER_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch<GetOrderDetailsActionError>({
        type: ActionTypes.GET_ORDER_DETAILS_ERROR,
        payload: e.response
          ? e.response.data.error
          : "server is not responding",
      });
    }
  };
