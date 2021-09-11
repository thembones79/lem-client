import {
  DashboardAction,
  ActionTypes,
  OrderStatsType,
  OrderListType,
  OrderDetailsType,
  Tab,
} from "../actions";

export interface IDashboardState {
  activeSidebarTab: Tab;
  _id: string;
  orders: OrderListType[];
  orderDetails: OrderDetailsType;
  liveView: OrderStatsType[];
  activeOrderComponent: ActionTypes;
  isLoading: boolean;
  errorMessage: string;
}

const DASHBOARD_INITIAL_STATE: IDashboardState = {
  activeSidebarTab: Tab.ManagementOrders,
  activeOrderComponent: ActionTypes.LIST,
  liveView: [],
  _id: "",
  orders: [],
  orderDetails: {
    orderNumber: "",
    _id: "",
    partNumber: "",
    orderStatus: "",
    quantity: 0,
    orderAddedAt: "",
    lastValidScan: "",
    scansAlready: 0,
    validScans: 0,
    linesUsed: "",
    netTime: "",
    meanCycleTime: "",
    meanHourlyRate: 0,
    meanGrossHourlyRate: 0,
    standardHourlyRate: "",
    hourlyRates: [],
  },
  isLoading: false,
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

    case ActionTypes.GET_ORDERS_BEGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case ActionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
        errorMessage: null,
      };

    case ActionTypes.GET_ORDERS_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
      };

    case ActionTypes.GET_ORDER_DETAILS_BEGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case ActionTypes.GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderDetails: action.payload,
        errorMessage: null,
      };

    case ActionTypes.GET_ORDER_DETAILS_ERROR:
      return { ...state, isLoading: false, errorMessage: action.payload };

    case ActionTypes.VIEW_ORDER_DETAILS:
      return {
        ...state,
        activeOrderComponent: ActionTypes.VIEW,
        _id: action.payload,
      };

    case ActionTypes.BACK_TO_ORDERS_LIST:
      return {
        ...state,
        activeOrderComponent: ActionTypes.LIST,
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
