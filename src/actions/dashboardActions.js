import { CHOOSE_SIDEBAR_TAB } from "./types";

export const chooseSidebarTab = (tab) => {
  return {
    type: CHOOSE_SIDEBAR_TAB,
    payload: tab,
  };
};
