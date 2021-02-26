import { combineReducers } from "redux";
import auth from "./authReducer";
import scanner from "./scannerReducer";
import dashboard from "./dashboardReducer";
import wids from "./widsReducer";
import modal from "./modalReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  auth,
  dashboard,
  wids,
  scanner,
  modal,
  form: formReducer,
});
