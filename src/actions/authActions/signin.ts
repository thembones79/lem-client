import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL } from "../../config";

export interface ISignin {
  email: string;
  password: string;
}

export type AutenticatedUser = {
  token: string;
  userType: string;
  userName: string;
  userId: string;
};

export type SigninAction = {
  type: ActionTypes.AUTH_USER;
  payload: AutenticatedUser;
};

export type SigninActionError = {
  type: ActionTypes.AUTH_ERROR;
  payload: string;
};

export const signin = (
  { email, password }: ISignin,
  callback: () => void // for redirect user to "scanner" route
) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post<AutenticatedUser>(`${ROOT_URL}/signin`, {
      email,
      password,
    });
    //update state
    dispatch<SigninAction>({
      type: ActionTypes.AUTH_USER,
      payload: response.data,
    });
    // save JWT
    localStorage.setItem("token", response.data.token);

    // redirect user to "scanner" route (in this case)
    callback();
  } catch (e) {
    dispatch<SigninActionError>({
      type: ActionTypes.AUTH_ERROR,
      payload: "Wrong email or password",
    });
  }
};
