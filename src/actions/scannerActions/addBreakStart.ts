import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, OrderType } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IAddBreakStart {
  orderNumber?: string | null;
  _line?: string | null;
}

export type AddBreakStartAction = {
  type: ActionTypes.ADD_BREAK_START;
  payload: { existingOrder: OrderType };
};

export type AddBreakStartActionError = {
  type: ActionTypes.ADD_BREAK_START_ERROR;
  payload: string;
};

export const addBreakStart = ({ orderNumber, _line }: IAddBreakStart) => async (
  dispatch: Dispatch
) => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/api/break/start`,
      {
        orderNumber,
        _line,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<AddBreakStartAction>({
      type: ActionTypes.ADD_BREAK_START,
      payload: response.data,
    });
  } catch (e) {
    dispatch<AddBreakStartActionError>({
      type: ActionTypes.ADD_BREAK_START_ERROR,
      payload: e.response.data.error,
    });
  }
};
