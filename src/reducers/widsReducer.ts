import {
  WidsAction,
  ActionTypes,
  RedirectionType,
  ProductType,
} from "../actions";

export interface IWidsState {
  redirections?: RedirectionType[];
  products?: ProductType[];
  prodsWithThisRedir?: ProductType[];
  filteredProducts?: ProductType[];
  productDetails?: ProductType;
  errorMessage?: string;
  message?: string;
  isLoading?: boolean;
  activeRedirectionComponent?: ActionTypes;
  activeProductComponent?: ActionTypes;
  redirectionId?: string;
  initRedirection?: RedirectionType | {};
  productId?: string;
  initProduct?: ProductType | {};
}

const WIDS_INITIAL_STATE: IWidsState = {
  redirections: [],
  products: [],
  prodsWithThisRedir: [],
  filteredProducts: [],
  productDetails: undefined,
  errorMessage: "",
  message: "",
  isLoading: false,
  activeRedirectionComponent: ActionTypes.LIST,
  activeProductComponent: ActionTypes.LIST,
  redirectionId: "",
  initRedirection: {},
  productId: "",
  initProduct: {},
};

export const widsReducer = (state = WIDS_INITIAL_STATE, action: WidsAction) => {
  switch (action.type) {
    case ActionTypes.GET_REDIRECTIONS:
      return {
        ...state,
        redirections: action.payload,
      };
    case ActionTypes.GET_REDIRECTIONS_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.ADD_REDIRECTION:
      return {
        ...state,
        activeRedirectionComponent: ActionTypes.LIST,
      };

    case ActionTypes.ADD_REDIRECTION_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.SAVE_REDIRECTION:
      return {
        ...state,
        activeRedirectionComponent: ActionTypes.LIST,
      };

    case ActionTypes.BACK_TO_REDIRECTIONS_LIST:
      return {
        ...state,
        activeRedirectionComponent: ActionTypes.LIST,
      };

    case ActionTypes.SAVE_REDIRECTION_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.START_ADDING_REDIRECTION:
      return {
        ...state,
        activeRedirectionComponent: ActionTypes.NEW,
      };

    case ActionTypes.START_EDITING_REDIRECTION:
      return {
        ...state,
        activeRedirectionComponent: ActionTypes.EDIT,
        redirectionId: action.payload._id,
        initRedirection: action.payload,
      };

    case ActionTypes.ADD_PRODUCTS_TO_REDIRECTION:
      return {
        ...state,
        activeRedirectionComponent: ActionTypes.REDIRECTION_WITH_PRODUCTS_PAGE,
        redirectionId: action.payload._id,
        initRedirection: action.payload,
      };

    case ActionTypes.START_ADDING_PRODUCTS_TO_REDIRECTION:
      return {
        ...state,
        activeRedirectionComponent: ActionTypes.REDIRECTION_WITH_PRODUCTS_PAGE,
        redirectionId: action.payload.existingRedirection._id,
        initRedirection: action.payload.existingRedirection,
        prodsWithThisRedir: action.payload.prodsWithThisRedir,
      };

    case ActionTypes.SEND_PRODUCTS:
      return {
        ...state,
        prodsWithThisRedir: action.payload,
      };

    case ActionTypes.START_ADDING_PRODUCTS_TO_REDIRECTION_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.UPDATE_MANY_PRODS_WITH_ONE_REDIR:
      return {
        ...state,
        activeRedirectionComponent: ActionTypes.LIST,
      };

    case ActionTypes.UPDATE_MANY_PRODS_WITH_ONE_REDIR_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.DELETE_REDIRECTION:
      return {
        ...state,
        message: action.payload,
        redirections: state.redirections?.filter(
          (r) => r._id !== action.payload
        ),
      };

    case ActionTypes.DELETE_REDIRECTION_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ActionTypes.GET_PRODUCTS_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.GET_PRODUCT_BEGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case ActionTypes.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productDetails: action.payload,
        errorMessage: null,
      };
    case ActionTypes.GET_PRODUCT_ERROR:
      return { ...state, isLoading: false, errorMessage: action.payload };

    case ActionTypes.ADD_PRODUCT:
      return {
        ...state,
        activeProductComponent: ActionTypes.EDIT,
        productId: action.payload._id,
        partNumber: action.payload.partNumber,
        initProduct: action.payload,
      };

    case ActionTypes.ADD_PRODUCT_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.BACK_TO_PRODUCTS_LIST:
      return {
        ...state,
        activeProductComponent: ActionTypes.LIST,
      };

    case ActionTypes.START_ADDING_PRODUCT:
      return {
        ...state,
        activeProductComponent: ActionTypes.NEW,
      };

    case ActionTypes.START_EDITING_PRODUCT:
      return {
        ...state,
        activeProductComponent: ActionTypes.EDIT,
        productId: action.payload._id,
        initProduct: action.payload,
      };

    case ActionTypes.UPDATE_PRODUCTS_LIST:
      return {
        ...state,
        filteredProducts: action.payload,
      };

    case ActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        message: action.payload,
        products: state.products?.filter((p) => p._id !== action.payload),
        filteredProducts: state.filteredProducts?.filter(
          (p) => p._id !== action.payload
        ),
      };

    case ActionTypes.DELETE_PRODUCT_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.ADD_LINK_IN_PRODUCT:
      return {
        ...state,
        productDetails: action.payload,
      };
    case ActionTypes.ADD_LINK_IN_PRODUCT_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.ADD_REDIRECTION_IN_PRODUCT:
      return {
        ...state,
        productDetails: action.payload,
      };
    case ActionTypes.ADD_REDIRECTION_IN_PRODUCT_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.DELETE_CONNECTED_LINK_ITEM:
      return {
        ...state,
        productDetails: action.payload,
      };
    case ActionTypes.DELETE_CONNECTED_LINK_ITEM_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.DELETE_CONNECTED_REDIRECTION_ITEM:
      return {
        ...state,
        productDetails: action.payload,
      };
    case ActionTypes.DELETE_CONNECTED_REDIRECTION_ITEM_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
        productDetails: {},
      };

    default:
      return state;
  }
};
