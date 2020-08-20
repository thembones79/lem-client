import axios from "axios";
import { AUTH_USER, AUTH_ERROR, ADD_USER, ADD_USER_ERROR } from "./types";
import { ROOT_URL } from "../config";

export const signup = (
  { firstname, lastname, email, password, type },
  callback // for redirect user to "scanner" route
) => async (dispatch) => {
  try {
    const response = await axios.post(`${ROOT_URL}/signup`, {
      firstname,
      lastname,
      email,
      password,
      type,
    });
    dispatch({ type: AUTH_USER, payload: response.data });
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
    const response = await axios.post(`${ROOT_URL}/signin`, {
      email,
      password,
    });
    //update state
    dispatch({ type: AUTH_USER, payload: response.data });
    // save JWT
    localStorage.setItem("token", response.data.token);

    // redirect user to "scanner" route (in this case)
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: e.message });
  }
};

export const signout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("line");
  localStorage.removeItem("order");
  return {
    type: AUTH_USER,
    payload: "",
  };
};

export const addUser = (
  { firstname, lastname, email, password, type },
  callback // for redirect user to "scanner" route
) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/api/user`,
      {
        firstname,
        lastname,
        email,
        password,
        type,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch({ type: ADD_USER, payload: response.data });

    callback(); // for redirect user to "scanner" route (in this case)
  } catch (e) {
    dispatch({ type: ADD_USER_ERROR, payload: e.message });
  }
};
