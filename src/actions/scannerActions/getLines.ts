import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL } from "../../config";

export type LineType = {
  _id: string;
  lineNumber: number;
  lineDescription: string;
  lineOccupiedWith: string;
  lineStatus: string;
};

export type GetLinesAction = {
  type: ActionTypes.GET_LINES;
  payload: LineType[];
};

export type GetLinesActionError = {
  type: ActionTypes.GET_LINES_ERROR;
  payload: string;
};

export const getLines = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${ROOT_URL}/api/lines`, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch<GetLinesAction>({
      type: ActionTypes.GET_LINES,
      payload: response.data.lines,
    });
  } catch (e) {
    dispatch<GetLinesActionError>({
      type: ActionTypes.GET_LINES_ERROR,
      payload: e.message,
    });
  }
};
