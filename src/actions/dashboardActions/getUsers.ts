import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "..";
import { ROOT_URL, headers } from "../../config";

export type UserType = {
  _id: string;
  firstname: string;
  lastname: string;
  type: string;
  email: string;
  password: string;
};

export type GetUsersBeginAction = {
  type: ActionTypes.GET_USERS_BEGIN;
};

export type GetUsersSuccessAction = {
  type: ActionTypes.GET_USERS_SUCCESS;
  payload: UserType[];
};

export type GetUsersActionError = {
  type: ActionTypes.GET_USERS_ERROR;
  payload: string;
};

export const getUsers = () => async (dispatch: Dispatch) => {
  dispatch<GetUsersBeginAction>({
    type: ActionTypes.GET_USERS_BEGIN,
  });
  try {
    const response = await axios.get(`${ROOT_URL}/api/user`, {
      headers,
    });
    dispatch<GetUsersSuccessAction>({
      type: ActionTypes.GET_USERS_SUCCESS,
      payload: response.data.users,
    });
  } catch (e: any) {
    dispatch<GetUsersActionError>({
      type: ActionTypes.GET_USERS_ERROR,
      payload: e.response ? e.response.data.error : "server is not responding",
    });
  }
};
