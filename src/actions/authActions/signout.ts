import { ActionTypes, AutenticatedUser } from "../../actions";

export type SignoutAction = {
  type: ActionTypes.AUTH_USER;
  payload: AutenticatedUser;
};

export const signout = (): SignoutAction => {
  localStorage.removeItem("token");
  localStorage.removeItem("line");
  localStorage.removeItem("order");
  window.location.replace(
    `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
  );
  return {
    type: ActionTypes.AUTH_USER,
    payload: { token: "", userType: "", userName: "", userId: "" },
  };
};
