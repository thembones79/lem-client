import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";
export const signup = (
  { firstname, lastname, email, password, type },
  callback // for redirect user to "scanner" route
) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3090/signup", {
      firstname,
      lastname,
      email,
      password,
      type,
    });
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback(); // for redirect user to "scanner" route (in this case)
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signin = (
  { email, password },
  callback // for redirect user to "scanner" route
) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3090/signin", {
      email,
      password,
    });
    //update state
    dispatch({ type: AUTH_USER, payload: response.data.token });
    // save JWT
    localStorage.setItem("token", response.data.token);
    // redirect user to "scanner" route (in this case)
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};

export const signout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: "",
  };
};
