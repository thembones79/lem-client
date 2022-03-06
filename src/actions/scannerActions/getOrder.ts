import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, OrderType } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export interface IGetOrder {
  orderNumber: string;
}

export type GetOrderAction = {
  type: ActionTypes.GET_ORDER;
  payload: OrderType;
};

export type GetOrderActionError = {
  type: ActionTypes.GET_ORDER_ERROR;
  payload: string;
};

export const getOrder =
  ({ orderNumber }: IGetOrder) =>
  async (dispatch: Dispatch) => {
    const dashedordernumber = orderNumber.replace(/\//g, "-");
    try {
      const response = await axios.get(
        `${ROOT_URL}/api/order/${dashedordernumber}`,
        {
          headers,
        }
      );
      dispatch<GetOrderAction>({
        type: ActionTypes.GET_ORDER,
        payload: response.data.existingOrder,
      });
      localStorage.setItem("order", orderNumber);
    } catch (e: any) {
      dispatch<GetOrderActionError>({
        type: ActionTypes.GET_ORDER_ERROR,
        payload: e.message,
      });
    }
  };
