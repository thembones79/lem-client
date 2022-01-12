import {
  DashboardAction,
  ActionTypes,
  OrderStatsType,
  OrderListType,
  OrderDetailsType,
  PartnumberListType,
  PartnumberDetailsType,
  Tab,
} from "../actions";

export interface IDashboardState {
  activeSidebarTab: Tab;
  _id: string;
  orders: OrderListType[];
  partnumbers: PartnumberListType[];
  filteredPartnumbers: PartnumberListType[];
  orderDetails: OrderDetailsType;
  partnumberDetails: PartnumberDetailsType;
  liveView: OrderStatsType[];
  activeOrderComponent: ActionTypes;
  isLoading: boolean;
  errorMessage: string;
}

const DASHBOARD_INITIAL_STATE: IDashboardState = {
  activeSidebarTab: Tab.ManagementProducts,
  activeOrderComponent: ActionTypes.LIST,
  liveView: [],
  _id: "",
  orders: [],
  partnumbers: [],
  filteredPartnumbers: [],
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
    givenHourlyRate: 0,
    hourlyRates: [],
  },
  partnumberDetails: {
    _id: "",
    givenHourlyRate: 0,
    suggestedHourlyRate: 0,
    givenTactTime: 0,
    suggestedTactTime: 0,
    xlsxTactTime: 0,
    automatic: false,
    partNumber: "",
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

    case ActionTypes.GET_PARTNUMBERS_BEGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case ActionTypes.GET_PARTNUMBERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        partnumbers: action.payload,
        errorMessage: null,
      };

    case ActionTypes.GET_PARTNUMBERS_ERROR:
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

    case ActionTypes.GET_PARTNUMBER_DETAILS_BEGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case ActionTypes.GET_PARTNUMBER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        partnumberDetails: action.payload,
        errorMessage: null,
      };

    case ActionTypes.GET_PARTNUMBER_DETAILS_ERROR:
      return { ...state, isLoading: false, errorMessage: action.payload };

    // case ActionTypes.EDIT_PARTNUMBER_DETAILS:
    //   return {
    //     ...state,
    //     activePartnumberComponent: ActionTypes.EDIT,
    //     _id: action.payload,
    //   };

    // case ActionTypes.BACK_TO_PARTNUMBERS_LIST:
    //   return {
    //     ...state,
    //     activePartnumberComponent: ActionTypes.LIST,
    //   };

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
