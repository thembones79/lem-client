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
  GET_MENU,
  GET_MENU_ERROR,
  PICK_ORDER,
  PICK_ORDER_ERROR,
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
    await axios.put(
      `${ROOT_URL}/api/line/status`,
      {
        lineId: currentLineId || newLineId,
        lineStatus: "free",
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

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

export const freeLine = (lineId) => async (dispatch) => {
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

    //update state
    dispatch({ type: PICK_LINE, payload: "" });
  } catch (e) {
    dispatch({ type: PICK_LINE_ERROR, payload: e.message });
  }
};

export const getMenu = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${ROOT_URL}/api/menu`,

      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    //update state
    dispatch({ type: GET_MENU, payload: response.data });
  } catch (e) {
    dispatch({ type: GET_MENU_ERROR, payload: e.message });
  }
};

export const pickOrder = (orderNumber) => async (dispatch) => {
  try {
    const dashedOrderNumber = orderNumber.replace(/\//g, "-");
    const response = await axios.get(
      `${ROOT_URL}/api/order/${dashedOrderNumber}`,

      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    //update state
    dispatch({
      type: PICK_ORDER,
      payload: {
        orderNumberFromMenu: orderNumber,
        orderDetails: response.data,
      },
    });
    localStorage.setItem("order", orderNumber);
  } catch (e) {
    dispatch({ type: PICK_ORDER_ERROR, payload: e.message });
  }
};
