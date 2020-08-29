import {
  FETCH_MESSAGE,
  INSERT_SCAN,
  INSERT_SCAN_ERROR,
  GET_ORDER,
  GET_ORDER_ERROR,
  GET_LINES,
  GET_LINES_ERROR,
  PICK_LINE,
  PICK_LINE_ERROR,
  GET_MENU,
  GET_MENU_ERROR,
  PICK_ORDER,
  PICK_ORDER_ERROR,
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  CLOSE_ORDER,
  CLOSE_ORDER_ERROR,
  DELETE_ORDER,
  DELETE_ORDER_ERROR,
  ENABLE_READER_INPUT,
  DISABLE_READER_INPUT,
  ADD_BREAK_START,
  ADD_BREAK_START_ERROR,
  ADD_BREAK_END,
  ADD_BREAK_END_ERROR,
  SET_ORDER_PAUSE_STATUS,
  PAUSE_ORDER,
  RESUME_ORDER,
  OPEN_FINISH_MODAL,
  CLOSE_FINISH_MODAL,
  OPEN_DELETE_MODAL,
  CLOSE_DELETE_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  message: "",
  lines: [],
  userType: "",
  userName: "",
  userId: "",
  userEmail: "",
  pickedOrder: "",
  deleteMessage: "",
  isPaused: false,
  isRunning: false,
  isModalOpened: false,
  modalHeader: "",
  modalContent: "",
  modalAction: "",
  isOrderedQuantityMatchesValidScansQuantity: false,
  orderDetails: {},
  errorMessage: "",
  readerInputState: { isDisabled: 1 },
  existingOrder: {
    scans: [
      {
        _id: "waiting...",
        timeStamp: "",
        errorCode: "",
        scanContent: "waiting...",
      },
    ],
  },
};

const compareOrderedQuantityWithValidScansQuantity = (existingOrder) => {
  if (existingOrder) {
    const { scans } = existingOrder;
    if (scans.length === 0) {
      return false;
    }
    const scansWithoutErrors = scans
      .filter((scan) => scan.errorCode === "e000")
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

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        userName: action.payload.user.firstname,
        userEmail: action.payload.user.email,
        userType: action.payload.user.type,
        userId: action.payload.user._id,
      };
    case INSERT_SCAN:
      return {
        ...state,
        existingOrder: action.payload.existingOrder,
        isOrderedQuantityMatchesValidScansQuantity: compareOrderedQuantityWithValidScansQuantity(
          action.payload.existingOrder
        ),
        errorMessage: "",
      };
    case INSERT_SCAN_ERROR:
      return { ...state, errorMessage: action.payload };

    case GET_ORDER:
      return {
        ...state,
        existingOrder: action.payload.existingOrder,
        isOrderedQuantityMatchesValidScansQuantity: compareOrderedQuantityWithValidScansQuantity(
          action.payload.existingOrder
        ),
        errorMessage: "",
      };
    case GET_ORDER_ERROR:
      return { ...state, errorMessage: "" };

    case GET_LINES:
      return {
        ...state,
        lines: action.payload,
      };
    case GET_LINES_ERROR:
      return { ...state, errorMessage: action.payload };

    case PICK_LINE:
      return {
        ...state,
        pickedLine: action.payload,
        errorMessage: "",
      };

    case PICK_LINE_ERROR:
      return { ...state, errorMessage: "" };

    case GET_MENU:
      return {
        ...state,
        menu: action.payload,
      };

    case GET_MENU_ERROR:
      return { ...state, errorMessage: action.payload };

    case PICK_ORDER:
      return {
        ...state,
        pickedOrder: action.payload.orderNumberFromMenu,
        orderDetails: action.payload.orderDetails,
        errorMessage: "",
      };

    case PICK_ORDER_ERROR:
      return { ...state, errorMessage: "" };

    case CREATE_ORDER:
      return {
        ...state,
        existingOrder: action.payload.order,
      };

    case CREATE_ORDER_ERROR:
      return { ...state, errorMessage: action.payload };

    case DELETE_ORDER:
      return {
        ...state,
        existingOrder: action.payload,
      };

    case DELETE_ORDER_ERROR:
      return { ...state, errorMessage: action.payload };

    case CLOSE_ORDER:
      return {
        ...state, // copy the state (level 0)
        existingOrder: {
          ...state.existingOrder, // copy the nested object (level 1)
          orderStatus: action.payload,
        },
      };

    case CLOSE_ORDER_ERROR:
      return { ...state, errorMessage: action.payload };

    case ENABLE_READER_INPUT:
      return { ...state, readerInputState: action.payload };

    case DISABLE_READER_INPUT:
      return { ...state, readerInputState: action.payload };

    case ADD_BREAK_START:
      return {
        ...state,
        existingOrder: action.payload.existingOrder,
      };
    case ADD_BREAK_START_ERROR:
      return { ...state, errorMessage: action.payload };

    case ADD_BREAK_END:
      return {
        ...state,
        existingOrder: action.payload.existingOrder,
      };
    case ADD_BREAK_END_ERROR:
      return { ...state, errorMessage: action.payload };

    case SET_ORDER_PAUSE_STATUS:
      return {
        ...state,
        isRunning: action.payload,
      };

    case PAUSE_ORDER:
      return {
        ...state,
        isRunning: action.payload.isRunning,
      };

    case RESUME_ORDER:
      return {
        ...state,
        isRunning: action.payload.isRunning,
      };

    case OPEN_FINISH_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to finish/close this order?",
        modalContent: `finished/closed orders cannot be re-opened!

        if you want to add some scans into this order - use “PAUSE”
        instead
        of “finish”`,
        modalAction: "finish",
      };

    case CLOSE_FINISH_MODAL:
      return {
        ...state,
        isModalOpened: false,
        modalHeader: "",
        modalContent: "",
        modalAction: "",
      };

    case OPEN_DELETE_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to delete this order?",
        modalContent: `It can't be undone! So, if you are really 100% sure,
           smash the “YES…” button`,
        modalAction: "delete",
      };

    case CLOSE_DELETE_MODAL:
      return {
        ...state,
        isModalOpened: false,
        modalHeader: "",
        modalContent: "",
        modalAction: "",
      };

    default:
      return state;
  }
}
