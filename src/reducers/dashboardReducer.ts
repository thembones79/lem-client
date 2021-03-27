import { DashboardAction, ActionTypes, OrderStatsType, Tab } from "../actions";

export interface IDashboardState {
  activeSidebarTab: Tab;
  liveView: OrderStatsType[];
  errorMessage: string;
}

const DASHBOARD_INITIAL_STATE: IDashboardState = {
  activeSidebarTab: Tab.ManagementProducts,
  liveView: [],
  errorMessage: "",
};

export const dashboardReducer = (
  state = DASHBOARD_INITIAL_STATE,
  action: DashboardAction
) => {
  switch (action.type) {
    case ActionTypes.CHOOSE_SIDEBAR_TAB:
      return {
        ...state,
        activeSidebarTab: action.payload,
      };

    case ActionTypes.INIT_LIVEDATA:
      return {
        ...state,
        liveView: action.payload,
      };

    case ActionTypes.INIT_LIVEDATA_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case ActionTypes.REFRESH_LIVEDATA:
      return {
        ...state,
        liveView: action.payload,
      };

    default:
      return state;
  }
};
