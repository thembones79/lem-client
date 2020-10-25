import {
  CHOOSE_SIDEBAR_TAB,
  INIT_LIVEDATA,
  INIT_LIVEDATA_ERROR,
  REFRESH_LIVEDATA,
} from "../actions/types";

const INITIAL_STATE = {
  activeSidebarTab: "ManagementOrders",
  liveView: [],
  errorMessage: "",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHOOSE_SIDEBAR_TAB:
      return {
        ...state,
        activeSidebarTab: action.payload,
      };

    case INIT_LIVEDATA:
      return {
        ...state,
        liveView: action.payload,
      };

    case INIT_LIVEDATA_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case REFRESH_LIVEDATA:
      return {
        ...state,
        liveView: action.payload,
      };

    default:
      return state;
  }
}
