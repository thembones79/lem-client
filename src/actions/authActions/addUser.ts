import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export interface IAddUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  type: string;
}

export type AddUserAction = {
  type: ActionTypes.ADD_USER;
  payload: NewUser;
};

export type NewUser = {
  userType: string;
  userName: string;
  userId: string;
};

export type AddUserActionError = {
  type: ActionTypes.ADD_USER_ERROR;
  payload: string;
};

export const addUser =
  (
    { firstname, lastname, email, password, type }: IAddUser,
    callback: () => void // for redirect user to "scanner" route
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const response: any = await axios.post<NewUser>(
        `${ROOT_URL}/api/user`,
        {
          firstname,
          lastname,
          email,
          password,
          type,
        },
        {
          headers,
        }
      );
      dispatch<AddUserAction>({
        type: ActionTypes.ADD_USER,
        payload: response.data,
      });

      callback(); // for redirect user to "scanner" route (in this case)
    } catch (e: any) {
      dispatch<AddUserActionError>({
        type: ActionTypes.ADD_USER_ERROR,
        payload: e.message,
      });
    }
  };
