import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export interface ICreateOrder {
  orderNumber: string;
  quantity: number;
  partNumber: string;
  qrCode: string;
  customer: string;
  orderStatus?: string;
  orderAddedAt?: string;
}

export type OrderType = {
  _id: string;
  orderNumber?: string;
  quantity?: number;
  partNumber?: string;
  qrCode?: string;
  tactTime?: number;
  customer?: string;
  orderStatus?: string;
  orderAddedAt?: string;
  breaks?: {
    _id?: string;
    _line?: string;
    breakStart?: string;
    breakEnd?: string;
  }[];
  scans?: {
    _id?: string;
    timeStamp?: string;
    errorCode?: string;
    scanContent?: string;
    _line?: string;
    _user?: string;
  }[];
};

export type CreateOrderAction = {
  type: ActionTypes.CREATE_ORDER;
  payload: { order: OrderType };
};

export type CreateOrderActionError = {
  type: ActionTypes.CREATE_ORDER_ERROR;
  payload: string;
};

export const createOrder =
  ({ orderNumber, quantity, partNumber, qrCode, customer }: ICreateOrder) =>
  async (dispatch: Dispatch) => {
    try {
      const resp = await axios.post(
        `${ROOT_URL}/api/product/tt`,
        {
          partNumber,
        },
        {
          headers,
        }
      );

      const tactTime = resp.data.givenTactTime;
      console.log({ tactTime });
      const response = await axios.post(
        `${ROOT_URL}/api/order`,
        {
          orderNumber,
          quantity,
          partNumber,
          qrCode,
          tactTime,
          customer,
        },
        {
          headers,
        }
      );
      dispatch<CreateOrderAction>({
        type: ActionTypes.CREATE_ORDER,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch<CreateOrderActionError>({
        type: ActionTypes.CREATE_ORDER_ERROR,
        payload: "Can not create this order - incomplete information",
      });
    }
  };
