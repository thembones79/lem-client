import { CHOOSE_SIDEBAR_TAB } from "./types";
import axios from "axios";

import { INIT_LIVEDATA, INIT_LIVEDATA_ERROR, REFRESH_LIVEDATA } from "./types";
import { ROOT_URL } from "../config";

export const chooseSidebarTab = (tab) => {
  return {
    type: CHOOSE_SIDEBAR_TAB,
    payload: tab,
  };
};

export const initLiveData = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${ROOT_URL}/api/liveview`,

      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    //update state
    dispatch({ type: INIT_LIVEDATA, payload: response.data.liveView });
  } catch (e) {
    dispatch({
      type: INIT_LIVEDATA_ERROR,
      payload: "could not contact the API",
    });
  }
};

export const refreshLiveData = (data) => {
  return {
    type: REFRESH_LIVEDATA,
    payload: data.liveView,
  };
};
