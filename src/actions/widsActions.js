import axios from "axios";
import {
  GET_REDIRECTIONS,
  GET_REDIRECTIONS_ERROR,
  ADD_REDIRECTION,
  ADD_REDIRECTION_ERROR,
  SAVE_REDIRECTION,
  SAVE_REDIRECTION_ERROR,
  START_ADDING_REDIRECTION,
  START_EDITING_REDIRECTION,
  BACK_TO_REDIRECTIONS_LIST,
  DELETE_REDIRECTION,
  DELETE_REDIRECTION_ERROR,
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  ADD_PRODUCT,
  ADD_PRODUCT_ERROR,
  SAVE_PRODUCT,
  SAVE_PRODUCT_ERROR,
  START_ADDING_PRODUCT,
  START_EDITING_PRODUCT,
  BACK_TO_PRODUCTS_LIST,
  DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  UPDATE_PRODUCTS_LIST,
} from "./types";
import { ROOT_URL } from "../config";

export const getRedirections = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${ROOT_URL}/api/redirection`,

      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    dispatch({ type: GET_REDIRECTIONS, payload: response.data.redirections });
  } catch (e) {
    dispatch({ type: GET_REDIRECTIONS_ERROR, payload: e.response.data.error });
  }
};

export const startEditingRedirection = (initialData) => {
  return {
    type: START_EDITING_REDIRECTION,
    payload: initialData,
  };
};

export const startAddingRedirection = () => {
  return {
    type: START_ADDING_REDIRECTION,
  };
};

export const addRedirection = ({
  redirectFrom,
  redirectTo,
  description,
}) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/api/redirection`,
      {
        redirRoute: redirectFrom.trim(),
        description: description.trim(),
        fileName: redirectTo.trim(),
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    dispatch({ type: ADD_REDIRECTION, payload: response.data });
  } catch (e) {
    dispatch({ type: ADD_REDIRECTION_ERROR, payload: e.response.data.error });
  }
};

export const saveRedirection = (
  { redirectFrom, redirectTo, description },
  id
) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${ROOT_URL}/api/redirection/${id}`,
      {
        redirRoute: redirectFrom.trim(),
        description: description.trim(),
        fileName: redirectTo.trim(),
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    dispatch({ type: SAVE_REDIRECTION, payload: response.data });
  } catch (e) {
    dispatch({ type: SAVE_REDIRECTION_ERROR, payload: e.response.data.error });
  }
};

export const deleteRedirection = (_id) => async (dispatch) => {
  try {
    await axios.delete(
      `${ROOT_URL}/api/redirection/${_id}`,

      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch({ type: DELETE_REDIRECTION, payload: _id });
  } catch (e) {
    dispatch({
      type: DELETE_REDIRECTION_ERROR,
      payload: "Can not delete this redirection",
    });
  }
};

export const backToRedirectionsList = () => {
  return {
    type: BACK_TO_REDIRECTIONS_LIST,
  };
};

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${ROOT_URL}/api/product`,

      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    //update state
    dispatch({ type: GET_PRODUCTS, payload: response.data.products });
  } catch (e) {
    dispatch({ type: GET_PRODUCTS_ERROR, payload: e.response.data.error });
  }
};

export const updateProductsList = (products) => {
  return {
    type: UPDATE_PRODUCTS_LIST,
    payload: products,
  };
};

export const startEditingProduct = (initialData) => {
  return {
    type: START_EDITING_PRODUCT,
    payload: initialData,
  };
};

export const startAddingProduct = () => {
  return {
    type: START_ADDING_PRODUCT,
  };
};

export const deleteProduct = (_id) => async (dispatch) => {
  try {
    await axios.delete(
      `${ROOT_URL}/api/product/${_id}`,

      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    dispatch({ type: DELETE_PRODUCT, payload: _id });
  } catch (e) {
    dispatch({
      type: DELETE_PRODUCT_ERROR,
      payload: "Can not delete this product",
    });
  }
};

export const backToProductsList = () => {
  return {
    type: BACK_TO_PRODUCTS_LIST,
  };
};

export const addProduct = ({ partNumber }) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/api/product`,
      {
        partNumber: partNumber.trim(),
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    dispatch({ type: ADD_PRODUCT, payload: response.data.product });
  } catch (e) {
    dispatch({ type: ADD_PRODUCT_ERROR, payload: e.response.data.error });
  }
};

export const saveProduct = ({ partNumber }, id) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${ROOT_URL}/api/redirection/`,
      {
        _id: id,
        partNumber: partNumber.trim(),
        linksToDocs: [],
        linksToRedirs: [],
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    dispatch({ type: SAVE_PRODUCT, payload: response.data });
  } catch (e) {
    dispatch({ type: SAVE_PRODUCT_ERROR, payload: e.response.data.error });
  }
};
