import {
  OPEN_FINISH_MODAL,
  CLOSE_MODAL,
  OPEN_DELETE_MODAL,
  OPEN_DELETE_REDIRECTION_MODAL,
  OPEN_DELETE_PRODUCT_MODAL,
} from "./types";

export const openFinishModal = () => {
  return { type: OPEN_FINISH_MODAL };
};

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};

export const openDeleteModal = () => {
  return { type: OPEN_DELETE_MODAL };
};

export const openDeleteReditectionModal = (_id) => {
  return { type: OPEN_DELETE_REDIRECTION_MODAL, payload: _id };
};

export const openDeleteProductModal = (_id) => {
  return { type: OPEN_DELETE_PRODUCT_MODAL, payload: _id };
};
