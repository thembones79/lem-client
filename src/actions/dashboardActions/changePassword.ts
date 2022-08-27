import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "..";
import { ROOT_URL, headers } from "../../config";

export interface IChangePassword {
  password: string;
  _id: string;
}

export type ChangePasswordAction = {
  type: ActionTypes.CHANGE_PASSWORD;
  payload: string;
};

export type ChangePasswordActionError = {
  type: ActionTypes.CHANGE_PASSWORD_ERROR;
  payload: string;
};

export const changePassword =
  (
    { password,
      _id }: IChangePassword
  ) =>
    async (dispatch: Dispatch) => {
      try {
        const response = await axios.put(
          `${ROOT_URL}/api/user/password/${_id}`,
          {
            password,
          },
          {
            headers,
          }
        );
        dispatch<ChangePasswordAction>({
          type: ActionTypes.CHANGE_PASSWORD,
          payload: response.data,
        });
      } catch (e: any) {
        dispatch<ChangePasswordActionError>({
          type: ActionTypes.CHANGE_PASSWORD_ERROR,
          payload: e.response.data.error,
        });
      }
    };
