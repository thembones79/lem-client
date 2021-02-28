import {
  GET_REDIRECTIONS,
  GET_REDIRECTIONS_ERROR,
  ADD_REDIRECTION,
  ADD_REDIRECTION_ERROR,
  SAVE_REDIRECTION,
  SAVE_REDIRECTION_ERROR,
  START_ADDING_REDIRECTION,
  START_EDITING_REDIRECTION,
  DELETE_REDIRECTION,
  DELETE_REDIRECTION_ERROR,
  BACK_TO_REDIRECTIONS_LIST,
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
  NEW,
  EDIT,
  LIST,
} from "../actions/types";

const INITIAL_STATE = {
  redirections: [],
  products: [],
  filteredProducts: [],
  errorMessage: "",
  message: "",
  activeRedirectionComponent: LIST,
  activeProductComponent: LIST,
  redirectionId: "",
  initRedirection: {},
  productId: "",
  initProduct: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_REDIRECTIONS:
      return {
        ...state,
        redirections: action.payload,
      };
    case GET_REDIRECTIONS_ERROR:
      return { ...state, errorMessage: action.payload };

    case ADD_REDIRECTION:
      return {
        ...state,
        activeRedirectionComponent: LIST,
      };

    case ADD_REDIRECTION_ERROR:
      return { ...state, errorMessage: action.payload };

    case SAVE_REDIRECTION:
      return {
        ...state,
        activeRedirectionComponent: LIST,
      };

    case BACK_TO_REDIRECTIONS_LIST:
      return {
        ...state,
        activeRedirectionComponent: LIST,
      };

    case SAVE_REDIRECTION_ERROR:
      return { ...state, errorMessage: action.payload };

    case START_ADDING_REDIRECTION:
      return {
        ...state,
        activeRedirectionComponent: NEW,
      };

    case START_EDITING_REDIRECTION:
      return {
        ...state,
        activeRedirectionComponent: EDIT,
        redirectionId: action.payload._id,
        initRedirection: action.payload,
      };

    case DELETE_REDIRECTION:
      return {
        ...state,
        message: action.payload,
        redirections: state.redirections.filter(
          (r) => r._id !== action.payload
        ),
      };

    case DELETE_REDIRECTION_ERROR:
      return { ...state, errorMessage: action.payload };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCTS_ERROR:
      return { ...state, errorMessage: action.payload };

    case ADD_PRODUCT:
      return {
        ...state,
        activeProductComponent: EDIT,
        productId: action.payload._id,
        partNumber: action.payload.partNumber,
        initProduct: action.payload,
      };

    case ADD_PRODUCT_ERROR:
      return { ...state, errorMessage: action.payload };

    case SAVE_PRODUCT:
      return {
        ...state,
        activeProductComponent: LIST,
      };

    case BACK_TO_PRODUCTS_LIST:
      return {
        ...state,
        activeProductComponent: LIST,
      };

    case SAVE_PRODUCT_ERROR:
      return { ...state, errorMessage: action.payload };

    case START_ADDING_PRODUCT:
      return {
        ...state,
        activeProductComponent: NEW,
      };

    case START_EDITING_PRODUCT:
      return {
        ...state,
        activeProductComponent: EDIT,
        productId: action.payload._id,
        initProduct: action.payload,
      };

    case UPDATE_PRODUCTS_LIST:
      return {
        ...state,
        filteredProducts: action.payload,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        message: action.payload,
        products: state.products.filter((p) => p._id !== action.payload),
        filteredProducts: state.filteredProducts.filter(
          (p) => p._id !== action.payload
        ),
      };

    case DELETE_PRODUCT_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
}
