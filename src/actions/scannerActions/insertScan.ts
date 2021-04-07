import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, OrderType } from "../../actions";
import { ROOT_URL } from "../../config";
import { playProperSound } from "../../utils/audioPlayer";

export interface IInsertScan {
  scanContent: string;
  _line: string;
  _user: string;
  orderNumber: string;
}

export type InsertScanAction = {
  type: ActionTypes.INSERT_SCAN;
  payload: { existingOrder: OrderType };
};

export type InsertScanActionError = {
  type: ActionTypes.INSERT_SCAN_ERROR;
  payload: string;
};

export const insertScan = ({
  scanContent,
  _line,
  _user,
  orderNumber,
}: IInsertScan) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/api/scan`,
      {
        scanContent,
        _line,
        _user,
        orderNumber,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<InsertScanAction>({
      type: ActionTypes.INSERT_SCAN,
      payload: response.data,
    });
    playProperSound(response.data.existingOrder, _line);
  } catch (e) {
    dispatch<InsertScanActionError>({
      type: ActionTypes.INSERT_SCAN_ERROR,
      payload: "e.response.data.error",
    });
  }
};
