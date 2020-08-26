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
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  CLOSE_ORDER,
  CLOSE_ORDER_ERROR,
  DELETE_ORDER,
  DELETE_ORDER_ERROR,
  ENABLE_READER_INPUT,
  DISABLE_READER_INPUT,
  ADD_BREAK_START,
  ADD_BREAK_START_ERROR,
  ADD_BREAK_END,
  ADD_BREAK_END_ERROR,
  SET_ORDER_PAUSE_STATUS,
  PAUSE_ORDER,
  RESUME_ORDER,
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
  orderNumber,
  compareScanQuantitiesAndClose
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
    compareScanQuantitiesAndClose();
  } catch (e) {
    dispatch({
      type: INSERT_SCAN_ERROR,
      payload: "Please enter some value in the field.",
    });
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
    localStorage.setItem("order", orderNumber);
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

export const createOrder = ({
  orderNumber,
  quantity,
  partNumber,
  qrCode,
  tactTime,
  customer,
}) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/api/order`,
      {
        orderNumber,
        quantity,
        partNumber,
        qrCode,
        tactTime,
        customer,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    dispatch({ type: CREATE_ORDER, payload: response.data });
  } catch (e) {
    dispatch({
      type: CREATE_ORDER_ERROR,
      payload: "Can not create this order - incomplete information",
    });
  }
};

export const closeOrder = ({ orderNumber }) => async (dispatch) => {
  try {
    await axios.put(
      `${ROOT_URL}/api/order/close`,
      {
        orderNumber,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    //update state
    dispatch({ type: CLOSE_ORDER, payload: "closed" });
  } catch (e) {
    dispatch({ type: CLOSE_ORDER_ERROR, payload: e.response.data.error });
  }
};

export const deleteOrder = ({ orderNumber }) => async (dispatch) => {
  const dashedordernumber = orderNumber.replace(/\//g, "-");
  try {
    await axios.delete(
      `${ROOT_URL}/api/order/${dashedordernumber}`,

      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    dispatch({ type: DELETE_ORDER, payload: "" });
  } catch (e) {
    dispatch({
      type: DELETE_ORDER_ERROR,
      payload: "Can not delete this order",
    });
  }
};

export const enableReaderInput = () => {
  return {
    type: ENABLE_READER_INPUT,
    payload: { isDisabled: 0 },
  };
};

export const disableReaderInput = () => {
  return {
    type: DISABLE_READER_INPUT,
    payload: { isDisabled: 1 },
  };
};

export const addBreakStart = ({ orderNumber, _line }) => async (dispatch) => {
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

    //update state
    dispatch({ type: ADD_BREAK_START, payload: response.data });
  } catch (e) {
    dispatch({ type: ADD_BREAK_START_ERROR, payload: e.response.data.error });
  }
};

export const addBreakEnd = ({ orderNumber, _line }) => async (dispatch) => {
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

    //update state
    dispatch({ type: ADD_BREAK_END, payload: response.data });
  } catch (e) {
    dispatch({ type: ADD_BREAK_END_ERROR, payload: e.message });
  }
};

export const setOrderPauseStatus = (isRunning) => {
  return {
    type: SET_ORDER_PAUSE_STATUS,
    payload: isRunning,
  };
};

export const pauseOrder = () => {
  return {
    type: PAUSE_ORDER,
    payload: { isRunning: false },
  };
};

export const resumeOrder = () => {
  return {
    type: RESUME_ORDER,
    payload: { isRunning: true },
  };
};
