import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IDeleteOrder {
  orderNumber: string | null;
}

export type DeleteOrderAction = {
  type: ActionTypes.DELETE_ORDER;
  payload: "";
};

export type DeleteOrderActionError = {
  type: ActionTypes.DELETE_ORDER_ERROR;
  payload: string;
};

export const deleteOrder = ({ orderNumber }: IDeleteOrder) => async (
  dispatch: Dispatch
) => {
  // const dashedordernumber = typeof orderNumber === "string" ? orderNumber.replace(/\//g, "-") : "";
  //@ts-ignore
  const dashedordernumber = orderNumber.replace(/\//g, "-");
  try {
    await axios.delete(`${ROOT_URL}/api/order/${dashedordernumber}`, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch<DeleteOrderAction>({
      type: ActionTypes.DELETE_ORDER,
      payload: "",
    });
  } catch (e) {
    dispatch<DeleteOrderActionError>({
      type: ActionTypes.DELETE_ORDER_ERROR,
      payload: "Can not delete this order",
    });
  }
};
