import { ActionTypes } from "..";

export interface IOpenDeleteRedirectionModal {
  _id: string;
}

export type OpenDeleteRedirectionModalAction = {
  type: ActionTypes.OPEN_DELETE_REDIRECTION_MODAL;
  payload: string;
};

export const openDeleteRedirectionModal = ({
  _id,
}: IOpenDeleteRedirectionModal): OpenDeleteRedirectionModalAction => {
  return { type: ActionTypes.OPEN_DELETE_REDIRECTION_MODAL, payload: _id };
};
