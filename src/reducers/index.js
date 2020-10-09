import { combineReducers } from "redux";
import auth from "./authReducer";
import scanner from "./scannerReducer";
import dashboard from "./dashboardReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({ auth, dashboard, scanner, form: formReducer });
