import { combineReducers } from "redux";
import auth from "./auth";
import scanner from "./scanner";
import { reducer as formReducer } from "redux-form";

export default combineReducers({ auth, scanner, form: formReducer });
