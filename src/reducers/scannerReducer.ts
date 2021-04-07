import {
  ScannerAction,
  ActionTypes,
  OrderType,
  LineType,
  MenuDataType,
} from "../actions";

export interface IScannerState {
  message: string;
  lines: LineType[];
  userType: string;
  userName: string;
  userId: string;
  userEmail: string;
  pickedOrder: string;
  menu: MenuDataType;
  pickedLine: string;
  deleteMessage: string;
  isPaused: boolean;
  isRunning: boolean;
  isOrderedQuantityMatchesValidScansQuantity: boolean;
  orderDetails?: OrderType;
  errorMessage: string;
  readerInputState: { isDisabled: boolean };
  existingOrder?: OrderType;
}

const SCANNER_INITIAL_STATE: IScannerState = {
  message: "",
  lines: [],
  userType: "",
  userName: "",
  userId: "",
  userEmail: "",
  pickedOrder: "",
  menu: {
    menuContent: [
      {
        _id: "",
        orderNumber: "",
        quantity: 0,
        customer: "",
        qrCode: "",
        partNumber: "",
        tactTime: 0,
      },
    ],
    timestamp: "",
    idCode: "",
  },
  pickedLine: "",
  deleteMessage: "",
  isPaused: false,
  isRunning: false,
  isOrderedQuantityMatchesValidScansQuantity: false,
  orderDetails: {},
  errorMessage: "",
  readerInputState: { isDisabled: true },
  existingOrder: {
    scans: [
      {
        _id: "waiting...",
        timeStamp: "",
        errorCode: "",
        scanContent: "",
      },
    ],
  },
};

const compareOrderedQuantityWithValidScansQuantity = (
  existingOrder: OrderType
) => {
  if (existingOrder) {
    const { scans } = existingOrder;
    if (scans?.length === 0 || !scans) {
      return false;
    }
    const scansWithoutErrors = scans
      .filter((scan) => scan.errorCode === "e000" || scan.errorCode === "e004")
      .map((scan) => scan.scanContent);
    const orderedQuantity = existingOrder.quantity;
    const currentlyScannedQuantity = scansWithoutErrors.length;

    if (orderedQuantity === currentlyScannedQuantity) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const scannerReducer = (
  state = SCANNER_INITIAL_STATE,
  action: ScannerAction
) => {
  switch (action.type) {
    case ActionTypes.FETCH_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        userName: action.payload.user.firstname,
        userEmail: action.payload.user.email,
        userType: action.payload.user.type,
        userId: action.payload.user._id,
      };
    case ActionTypes.INSERT_SCAN:
      return {
        ...state,
        existingOrder: action.payload.existingOrder,
        isOrderedQuantityMatchesValidScansQuantity: compareOrderedQuantityWithValidScansQuantity(
          action.payload.existingOrder
        ),
        errorMessage: "",
      };
    case ActionTypes.INSERT_SCAN_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.GET_ORDER:
      return {
        ...state,
        existingOrder: action.payload,
        isOrderedQuantityMatchesValidScansQuantity: compareOrderedQuantityWithValidScansQuantity(
          action.payload
        ),
        errorMessage: "",
      };
    case ActionTypes.GET_ORDER_ERROR:
      return { ...state, errorMessage: "" };

    case ActionTypes.GET_LINES:
      return {
        ...state,
        lines: action.payload,
      };
    case ActionTypes.GET_LINES_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.PICK_LINE:
      return {
        ...state,
        pickedLine: action.payload,
        errorMessage: "",
      };

    case ActionTypes.PICK_LINE_ERROR:
      return { ...state, errorMessage: "" };

    case ActionTypes.GET_MENU:
      return {
        ...state,
        menu: action.payload,
      };

    case ActionTypes.GET_MENU_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.PICK_ORDER:
      return {
        ...state,
        pickedOrder: action.payload.orderNumberFromMenu,
        orderDetails: action.payload.orderDetails,
        errorMessage: "",
      };

    case ActionTypes.PICK_ORDER_ERROR:
      return { ...state, errorMessage: "" };

    case ActionTypes.CREATE_ORDER:
      return {
        ...state,
        existingOrder: action.payload.order,
      };

    case ActionTypes.CREATE_ORDER_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.DELETE_ORDER:
      return {
        ...state,
        existingOrder: action.payload,
      };

    case ActionTypes.DELETE_ORDER_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.CLOSE_ORDER:
      return {
        ...state, // copy the state (level 0)
        existingOrder: {
          ...state.existingOrder, // copy the nested object (level 1)
          orderStatus: action.payload,
        },
      };

    case ActionTypes.CLOSE_ORDER_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.ENABLE_READER_INPUT:
      return { ...state, readerInputState: action.payload };

    case ActionTypes.DISABLE_READER_INPUT:
      return { ...state, readerInputState: action.payload };

    case ActionTypes.ADD_BREAK_START:
      return {
        ...state,
        existingOrder: action.payload.existingOrder,
      };
    case ActionTypes.ADD_BREAK_START_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.ADD_BREAK_END:
      return {
        ...state,
        existingOrder: action.payload.existingOrder,
      };
    case ActionTypes.ADD_BREAK_END_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.SET_ORDER_PAUSE_STATUS:
      return {
        ...state,
        isRunning: action.payload,
      };

    case ActionTypes.PAUSE_ORDER:
      return {
        ...state,
        isRunning: action.payload.isRunning,
      };

    case ActionTypes.RESUME_ORDER:
      return {
        ...state,
        isRunning: action.payload.isRunning,
      };

    default:
      return state;
  }
};
