import {
  DashboardAction,
  ActionTypes,
  OrderStatsType,
  OrderListType,
  OrderDetailsType,
  PartnumberType,
  PartnumberConfigType,
  Tab,
  ComputationsBase,
  SourceOfTruth,
} from "../actions";

export interface IDashboardState {
  activeSidebarTab: Tab;
  _id: string;
  orders: OrderListType[];
  partnumbers: PartnumberType[];
  filteredPartnumbers: PartnumberType[];
  orderDetails: OrderDetailsType;
  partnumberDetails: PartnumberType;
  partnumberConfig: PartnumberConfigType;
  liveView: OrderStatsType[];
  activeOrderComponent: ActionTypes;
  activePartnumberComponent: ActionTypes;
  isLoading: boolean;
  errorMessage: string;
}

const DASHBOARD_INITIAL_STATE: IDashboardState = {
  activeSidebarTab: Tab.ManagementProducts,
  activeOrderComponent: ActionTypes.LIST,
  activePartnumberComponent: ActionTypes.LIST,
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
  partnumberConfig: {
    _id: "",
    sourceOftruth: SourceOfTruth.excel,
    computationsBase: ComputationsBase.tactTime,
    whatToShow: ComputationsBase.tactTime,
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

    case ActionTypes.GET_PARTNUMBER_CONFIG:
      return {
        ...state,
        partnumberConfig: action.payload,
        isLoading: false,
      };

    case ActionTypes.GET_PARTNUMBER_CONFIG_ERROR:
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

    case ActionTypes.CONFIGURE_PARTNUMBERS:
      return {
        ...state,
        activePartnumberComponent: ActionTypes.CONFIG,
      };

    case ActionTypes.BACK_TO_PARTNUMBERS_LIST:
      return {
        ...state,
        activePartnumberComponent: ActionTypes.LIST,
      };

    case ActionTypes.SAVE_PARTNUMBER_CONFIG:
      return {
        ...state,
        activePartnumberComponent: ActionTypes.LIST,
      };

    case ActionTypes.SAVE_PARTNUMBER_CONFIG_ERROR:
      return { ...state, isLoading: false, errorMessage: action.payload };

    case ActionTypes.UPDATE_PARTNUMBERS_LIST:
      return {
        ...state,
        filteredPartnumbers: action.payload,
      };

    case ActionTypes.START_EDITING_PARTNUMBER:
      return {
        ...state,
        activePartnumberComponent: ActionTypes.EDIT,
        partnumberDetails: action.payload,
      };

    case ActionTypes.SAVE_PARTNUMBER:
      return {
        ...state,
        activePartnumberComponent: ActionTypes.LIST,
      };

    case ActionTypes.SAVE_PARTNUMBER_ERROR:
      return { ...state, isLoading: false, errorMessage: action.payload };

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
