import {
  GET_REDIRECTIONS,
  GET_REDIRECTIONS_ERROR,
  TOGGLE_REDIRECTION_EDIT,
  ADD_REDIRECTION,
  ADD_REDIRECTION_ERROR,
  SAVE_REDIRECTION,
  SAVE_REDIRECTION_ERROR,
  START_ADDING_REDIRECTION,
  START_EDITING_REDIRECTION,
  DELETE_REDIRECTION,
  DELETE_REDIRECTION_ERROR,
  BACK_TO_REDIRECTIONS_LIST,
  NEW,
  EDIT,
  LIST,
} from "../actions/types";

const INITIAL_STATE = {
  redirections: [],
  errorMessage: "",
  message: "",
  isEditingRedirection: false,
  activeRedirectionComponent: LIST,
  redirectionId: "",
  initRedirection: {},
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

    case TOGGLE_REDIRECTION_EDIT:
      return { ...state, isEditingRedirection: !state.isEditingRedirection };

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

    default:
      return state;
  }
}
