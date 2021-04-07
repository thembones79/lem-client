import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, OrderType } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IAddBreakEnd {
  orderNumber?: string | null;
  _line?: string | null;
}

export type AddBreakEndAction = {
  type: ActionTypes.ADD_BREAK_END;
  payload: { existingOrder: OrderType };
};

export type AddBreakEndActionError = {
  type: ActionTypes.ADD_BREAK_END_ERROR;
  payload: string;
};

export const addBreakEnd = ({ orderNumber, _line }: IAddBreakEnd) => async (
  dispatch: Dispatch
) => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/api/break/end`,
      {
        orderNumber,
        _line,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch({ type: ActionTypes.ADD_BREAK_END, payload: response.data });
  } catch (e) {
    dispatch({ type: ActionTypes.ADD_BREAK_END_ERROR, payload: e.message });
  }
};
