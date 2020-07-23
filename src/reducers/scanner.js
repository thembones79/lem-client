import { FETCH_MESSAGE } from "../actions/types";

const INITIAL_STATE = {
  message: "",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
