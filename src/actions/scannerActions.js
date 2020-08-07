import axios from "axios";
import { FETCH_MESSAGE, INSERT_SCAN, INSERT_SCAN_ERROR } from "./types";
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
    console.log("A");
    console.log({ scanContent, _line, _user, orderNumber });
    console.log({ resp: response.data });
    //update state
    dispatch({ type: INSERT_SCAN, payload: response.data });
    // save JWT
    //localStorage.setItem("token", response.data.token);

    // redirect user to "scanner" route (in this case)
  } catch (e) {
    console.log("B");
    console.log({ scanContent, _line, _user, orderNumber });
    console.log(e);
    dispatch({ type: INSERT_SCAN_ERROR, payload: e.message });
  }
};
