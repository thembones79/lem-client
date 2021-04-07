import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL } from "../../config";

export interface ICreateOrder {
  orderNumber: string;
  quantity: number;
  partNumber: string;
  qrCode: string;
  tactTime: number;
  customer: string;
  orderStatus?: string;
  orderAddedAt?: string;
}

export type OrderType = {
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

export const createOrder = ({
  orderNumber,
  quantity,
  partNumber,
  qrCode,
  tactTime,
  customer,
}: ICreateOrder) => async (dispatch: Dispatch) => {
  try {
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
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<CreateOrderAction>({
      type: ActionTypes.CREATE_ORDER,
      payload: response.data,
    });
  } catch (e) {
    dispatch<CreateOrderActionError>({
      type: ActionTypes.CREATE_ORDER_ERROR,
      payload: "Can not create this order - incomplete information",
    });
  }
};
