import { ActionTypes } from "../../actions";

export type BackToUsersListAction = {
  type: ActionTypes.BACK_TO_USERS_LIST;
};

export const backToUsersList = (): BackToUsersListAction => {
  return {
    type: ActionTypes.BACK_TO_USERS_LIST,
  };
};
