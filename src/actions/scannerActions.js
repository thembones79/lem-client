import axios from "axios";
import {
  FETCH_MESSAGE,
  INSERT_SCAN,
  INSERT_SCAN_ERROR,
  GET_ORDER,
  GET_ORDER_ERROR,
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
