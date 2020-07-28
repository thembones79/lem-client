import { combineReducers } from "redux";
import auth from "./authReducer";
import scanner from "./scannerReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({ auth, scanner, form: formReducer });
