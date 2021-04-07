import { combineReducers } from "redux";
import { IAuthState, authReducer as auth } from "./authReducer";
import { IScannerState, scannerReducer as scanner } from "./scannerReducer";
import {
  IDashboardState,
  dashboardReducer as dashboard,
} from "./dashboardReducer";
import { IWidsState, widsReducer as wids } from "./widsReducer";
import { IModalState, modalReducer as modal } from "./modalReducer";
import { FormReducer, reducer as formReducer } from "redux-form";

export interface StoreState {
  auth: IAuthState;
  scanner: IScannerState;
  dashboard: IDashboardState;
  modal: IModalState;
  wids: IWidsState;
  form: FormReducer;
}

export default combineReducers({
  auth,
  scanner,
  dashboard,
  modal,
  wids,
  form: formReducer,
});
