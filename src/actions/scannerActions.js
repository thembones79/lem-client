import axios from "axios";
import {
  FETCH_MESSAGE,
  INSERT_SCAN,
  INSERT_SCAN_ERROR,
  GET_ORDER,
  GET_ORDER_ERROR,
  GET_LINES,
  GET_LINES_ERROR,
  PICK_LINE,
  PICK_LINE_ERROR,
  CHANGE_LINE,
  CHANGE_LINE_ERROR,
  LOAD_LINE,
} from "./types";
import { ROOT_URL } from "../config";

export const fetchMessage = () => {
  return function (dispatch) {
    axios
      .get(ROOT_URL, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        dispatch({ type: FETCH_MESSAGE, payload: response.data });
      });
  };
};

export const insertScan = (
  { scanContent },
  _line,
  _user,
  orderNumber
) => async (dispatch) => {
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

    //update state
    dispatch({ type: INSERT_SCAN, payload: response.data });
  } catch (e) {
    dispatch({ type: INSERT_SCAN_ERROR, payload: e.message });
  }
};

export const getOrder = (orderNumber) => async (dispatch) => {
  const dashedordernumber = orderNumber.replace(/\//g, "-");
  try {
    const response = await axios.get(
      `${ROOT_URL}/api/order/${dashedordernumber}`,

      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    //update state
    dispatch({ type: GET_ORDER, payload: response.data });
  } catch (e) {
    dispatch({ type: GET_ORDER_ERROR, payload: e.message });
  }
};

export const getLines = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${ROOT_URL}/api/lines`,

      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    //update state
    dispatch({ type: GET_LINES, payload: response.data.lines });
  } catch (e) {
    dispatch({ type: GET_LINES_ERROR, payload: e.message });
  }
};

export const pickLine = (currentLineId, newLineId, userName) => async (
  dispatch
) => {
  try {
    const response = await axios.put(
      `${ROOT_URL}/api/line/status`,
      {
        lineId: currentLineId || newLineId,
        lineStatus: "free",
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    //update state
    dispatch({ type: CHANGE_LINE, payload: response.data });
  } catch (e) {
    dispatch({ type: CHANGE_LINE_ERROR, payload: e.message });
  }

  try {
    await axios.put(
      `${ROOT_URL}/api/line/status`,
      {
        lineId: newLineId,
        lineStatus: userName,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    //update state
    dispatch({ type: PICK_LINE, payload: newLineId });
    localStorage.setItem("line", newLineId);
  } catch (e) {
    dispatch({ type: PICK_LINE_ERROR, payload: e.message });
  }
};

export const loadLine = (data) => ({ type: LOAD_LINE, payload: data });
