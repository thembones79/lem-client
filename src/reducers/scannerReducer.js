import {
  FETCH_MESSAGE,
  INSERT_SCAN,
  INSERT_SCAN_ERROR,
} from "../actions/types";

const INITIAL_STATE = {
  message: "",
  userType: "",
  userName: "",
  userId: "",
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

    default:
      return state;
  }
}
