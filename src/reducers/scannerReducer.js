import { FETCH_MESSAGE } from "../actions/types";

const INITIAL_STATE = {
  message: "",
  userType: "",
  userName: "",
  userId: "",
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

    default:
      return state;
  }
}
