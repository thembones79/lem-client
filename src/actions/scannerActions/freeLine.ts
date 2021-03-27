import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IFreeLine {
  lineId: string;
}

export type FreeLineAction = {
  type: ActionTypes.PICK_LINE;
  payload: "";
};

export type FreeLineActionError = {
  type: ActionTypes.PICK_LINE_ERROR;
  payload: string;
};

export const freeLine = ({ lineId }: IFreeLine) => async (
  dispatch: Dispatch
) => {
  try {
    await axios.put(
      `${ROOT_URL}/api/line/status`,
      {
        lineId,
        lineStatus: "free",
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<FreeLineAction>({ type: ActionTypes.PICK_LINE, payload: "" });
  } catch (e) {
    dispatch<FreeLineActionError>({
      type: ActionTypes.PICK_LINE_ERROR,
      payload: e.message,
    });
  }
};
