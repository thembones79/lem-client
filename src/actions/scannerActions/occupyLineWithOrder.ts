import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IOccupyLineWithOrder {
  _line: string | null;
  orderNumber: string;
}

export type OccupyLineWithOrderAction = {
  type: ActionTypes.OCCUPY_LINE_WITH_ORDER;
};

export type OccupyLineWithOrderActionError = {
  type: ActionTypes.OCCUPY_LINE_WITH_ORDER_ERROR;
  payload: string;
};

export const occupyLineWithOrder = ({
  _line,
  orderNumber,
}: IOccupyLineWithOrder) => async (dispatch: Dispatch) => {
  try {
    await axios.put(
      `${ROOT_URL}/api/line/occupiedwith`,
      {
        lineId: _line,
        orderNumber,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<OccupyLineWithOrderAction>({
      type: ActionTypes.OCCUPY_LINE_WITH_ORDER,
    });
  } catch (e) {
    dispatch<OccupyLineWithOrderActionError>({
      type: ActionTypes.OCCUPY_LINE_WITH_ORDER_ERROR,
      payload: e.message,
    });
  }
};
