import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, OrderType } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IPickOrder {
  orderNumber: string;
}

export type PickedOrderType = {
  orderNumberFromMenu: string;
  orderDetails: OrderType;
};

export type PickOrderAction = {
  type: ActionTypes.PICK_ORDER;
  payload: PickedOrderType;
};

export type PickOrderActionError = {
  type: ActionTypes.PICK_ORDER_ERROR;
  payload: string;
};

export const pickOrder = ({ orderNumber }: IPickOrder) => async (
  dispatch: Dispatch
) => {
  try {
    const dashedOrderNumber = orderNumber.replace(/\//g, "-");
    const response = await axios.get(
      `${ROOT_URL}/api/order/${dashedOrderNumber}`,
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<PickOrderAction>({
      type: ActionTypes.PICK_ORDER,
      payload: {
        orderNumberFromMenu: orderNumber,
        orderDetails: response.data,
      },
    });
    localStorage.setItem("order", orderNumber);
  } catch (e) {
    dispatch<PickOrderActionError>({
      type: ActionTypes.PICK_ORDER_ERROR,
      payload: e.message,
    });
  }
};
