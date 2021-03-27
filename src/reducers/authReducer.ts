import { AuthAction, ActionTypes } from "../actions";

export interface IAuthState {
  authenticated: string | null;
  errorMessage?: string;
  userType?: string;
  userName?: string;
  userId?: string;
}

export const AUTH_INITIAL_STATE: IAuthState = {
  authenticated: "",
  errorMessage: "",
  userType: "",
  userName: "",
  userId: "",
};

export const authReducer = (state = AUTH_INITIAL_STATE, action: AuthAction) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return {
        ...state,
        authenticated: action.payload.token,
        userType: action.payload.userType,
        userName: action.payload.userName,
        userId: action.payload.userId,
      };
    case ActionTypes.AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case ActionTypes.ADD_USER:
      return {
        ...state,
        userType: action.payload.userType,
        userName: action.payload.userName,
        userId: action.payload.userId,
      };
    case ActionTypes.ADD_USER_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};
