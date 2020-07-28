import {
  AUTH_USER,
  AUTH_ERROR,
  ADD_USER,
  ADD_USER_ERROR,
} from "../actions/types";

const INITIAL_STATE = {
  authenticated: "",
  errorMessage: "",
  userType: "",
  userName: "",
  userId: "",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload.token,
        userType: action.payload.userType,
        userName: action.payload.userName,
        userId: action.payload.userId,
      };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case ADD_USER:
      return {
        ...state,

        userType: action.payload.userType,
        userName: action.payload.userName,
        userId: action.payload.userId,
      };
    case ADD_USER_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
}
