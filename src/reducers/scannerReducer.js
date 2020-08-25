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
  orderDetails: {},
  errorMessage: "",
  readerInputState: { isDisabled: 1 },
  newOrder: {},
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
      };
    case INSERT_SCAN_ERROR:
      return { ...state, errorMessage: action.payload };

    case GET_ORDER:
      return {
        ...state,
        existingOrder: action.payload.existingOrder,
      };
    case GET_ORDER_ERROR:
      return { ...state, errorMessage: action.payload };

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
      };

    case PICK_LINE_ERROR:
      return { ...state, errorMessage: action.payload };

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
      };

    case PICK_ORDER_ERROR:
      return { ...state, errorMessage: action.payload };

    case CREATE_ORDER:
      return {
        ...state,
        newOrder: action.payload.order,
        orderDetails: action.payload.order,
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

    default:
      return state;
  }
}
