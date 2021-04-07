import { ActionTypes } from "../../actions";

export interface IOpenDeleteProductModal {
  _id: string;
}

export type OpenDeleteProductModalAction = {
  type: ActionTypes.OPEN_DELETE_PRODUCT_MODAL;
  payload: string;
};

export const openDeleteProductModal = ({
  _id,
}: IOpenDeleteProductModal): OpenDeleteProductModalAction => {
  return { type: ActionTypes.OPEN_DELETE_PRODUCT_MODAL, payload: _id };
};
