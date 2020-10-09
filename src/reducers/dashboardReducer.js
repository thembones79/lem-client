import { CHOOSE_SIDEBAR_TAB } from "../actions/types";

const INITIAL_STATE = {
  activeSidebarTab: "ManagementOrders",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHOOSE_SIDEBAR_TAB:
      return {
        ...state,
        activeSidebarTab: action.payload,
      };

    default:
      return state;
  }
}
