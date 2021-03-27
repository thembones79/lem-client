import {
  SigninAction,
  SigninActionError,
  SignoutAction,
  AddUserAction,
  AddUserActionError,
} from "./authActions";

import {
  FetchMessageAction,
  InsertScanAction,
  InsertScanActionError,
  GetOrderAction,
  GetOrderActionError,
  GetLinesAction,
  GetLinesActionError,
  PickLineAction,
  PickLineActionError,
  FreeLineAction,
  FreeLineActionError,
  OccupyLineWithOrderAction,
  OccupyLineWithOrderActionError,
  GetMenuAction,
  GetMenuActionError,
  PickOrderAction,
  PickOrderActionError,
  CreateOrderAction,
  CreateOrderActionError,
  CloseOrderAction,
  CloseOrderActionError,
  DeleteOrderAction,
  DeleteOrderActionError,
  EnableReaderInputAction,
  DisableReaderInputAction,
  AddBreakStartAction,
  AddBreakStartActionError,
  AddBreakEndAction,
  AddBreakEndActionError,
  PauseOrderAction,
  ResumeOrderAction,
  SetOrderPauseStatusAction,
} from "./scannerActions";

import {
  OpenFinishModalAction,
  CloseModalAction,
  OpenDeleteModalAction,
  OpenDeleteRedirectionModalAction,
  OpenDeleteProductModalAction,
} from "./modalActions";

import {
  ChooseSidebarTabAction,
  InitLiveDataAction,
  InitLiveDataActionError,
  RefreshLiveDataAction,
} from "./dashboardActions";

import {
  GetRedirectionsAction,
  GetRedirectionsActionError,
  StartEditingRedirectionAction,
  AddProductsToRedirectionAction,
  StartAddingProductsToRedirectionAction,
  StartAddingProductsToRedirectionActionError,
  AddRedirectionAction,
  AddRedirectionActionError,
  StartAddingRedirectionAction,
  SaveRedirectionAction,
  SaveRedirectionActionError,
  DeleteRedirectionAction,
  DeleteRedirectionActionError,
  BackToRedirectionsListAction,
  GetProductsAction,
  GetProductsActionError,
  UpdateProductsListAction,
  StartEditingProductAction,
  StartAddingProductAction,
  DeleteProductAction,
  DeleteProductActionError,
  BackToProductsListAction,
  AddProductAction,
  AddProductActionError,
  GetProductBeginAction,
  GetProductSuccessAction,
  GetProductActionError,
  AddLinkInProductAction,
  AddLinkInProductActionError,
  AddRedirectionInProductAction,
  AddRedirectionInProductActionError,
  DeleteConnectedLinkItemAction,
  DeleteConnectedLinkItemActionError,
  DeleteConnectedRedirectionItemAction,
  DeleteConnectedRedirectionItemActionError,
  SetMessageAction,
  SendProductsAction,
  UpdateManyProdsWithOneRedirAction,
  UpdateManyProdsWithOneRedirActionError,
} from "./widsActions";

export const UPDATE_MANY_PRODS_WITH_ONE_REDIR =
  "update_many_prods_with_one_redir";
export const UPDATE_MANY_PRODS_WITH_ONE_REDIR_ERROR =
  "update_many_prods_with_one_redir_error";

export enum ActionTypes {
  AUTH_USER,
  AUTH_ERROR,
  ADD_USER,
  ADD_USER_ERROR,
  FETCH_MESSAGE,
  INSERT_SCAN,
  INSERT_SCAN_ERROR,
  GET_ORDER,
  GET_ORDER_ERROR,
  GET_LINES,
  GET_LINES_ERROR,
  PICK_LINE,
  PICK_LINE_ERROR,
  OCCUPY_LINE_WITH_ORDER,
  OCCUPY_LINE_WITH_ORDER_ERROR,
  GET_MENU,
  GET_MENU_ERROR,
  PICK_ORDER,
  PICK_ORDER_ERROR,
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  CLOSE_ORDER,
  CLOSE_ORDER_ERROR,
  DELETE_ORDER,
  DELETE_ORDER_ERROR,
  ENABLE_READER_INPUT,
  DISABLE_READER_INPUT,
  ADD_BREAK_START,
  ADD_BREAK_START_ERROR,
  ADD_BREAK_END,
  ADD_BREAK_END_ERROR,
  SET_ORDER_PAUSE_STATUS,
  PAUSE_ORDER,
  RESUME_ORDER,
  OPEN_FINISH_MODAL,
  CLOSE_MODAL,
  OPEN_DELETE_MODAL,
  OPEN_DELETE_REDIRECTION_MODAL,
  OPEN_DELETE_PRODUCT_MODAL,
  CHOOSE_SIDEBAR_TAB,
  INIT_LIVEDATA,
  INIT_LIVEDATA_ERROR,
  REFRESH_LIVEDATA,
  GET_REDIRECTIONS,
  GET_REDIRECTIONS_ERROR,
  START_EDITING_REDIRECTION,
  ADD_PRODUCTS_TO_REDIRECTION,
  START_ADDING_PRODUCTS_TO_REDIRECTION,
  START_ADDING_PRODUCTS_TO_REDIRECTION_ERROR,
  ADD_REDIRECTION,
  ADD_REDIRECTION_ERROR,
  START_ADDING_REDIRECTION,
  SAVE_REDIRECTION,
  SAVE_REDIRECTION_ERROR,
  DELETE_REDIRECTION,
  DELETE_REDIRECTION_ERROR,
  BACK_TO_REDIRECTIONS_LIST,
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  UPDATE_PRODUCTS_LIST,
  START_EDITING_PRODUCT,
  START_ADDING_PRODUCT,
  DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  BACK_TO_PRODUCTS_LIST,
  ADD_PRODUCT,
  ADD_PRODUCT_ERROR,
  GET_PRODUCT_BEGIN,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  ADD_LINK_IN_PRODUCT,
  ADD_LINK_IN_PRODUCT_ERROR,
  ADD_REDIRECTION_IN_PRODUCT,
  ADD_REDIRECTION_IN_PRODUCT_ERROR,
  SET_MESSAGE,
  DELETE_CONNECTED_LINK_ITEM,
  DELETE_CONNECTED_LINK_ITEM_ERROR,
  DELETE_CONNECTED_REDIRECTION_ITEM,
  DELETE_CONNECTED_REDIRECTION_ITEM_ERROR,
  SEND_PRODUCTS,
  UPDATE_MANY_PRODS_WITH_ONE_REDIR,
  UPDATE_MANY_PRODS_WITH_ONE_REDIR_ERROR,
  REDIRECTION_WITH_PRODUCTS_PAGE,
  NEW,
  EDIT,
  LIST,
}

export enum Tab {
  AnalyticsLines,
  AnalyticsOrders,
  AnalyticsLiveView,
  ManagementCustomers,
  ManagementLines,
  ManagementOrders,
  ManagementTactTimes,
  ManagementUsers,
  ManagementProducts,
  ManagementRedirections,
}

export type AuthAction =
  | SigninAction
  | SigninActionError
  | SignoutAction
  | AddUserAction
  | AddUserActionError;

export type ScannerAction =
  | FetchMessageAction
  | InsertScanAction
  | InsertScanActionError
  | GetOrderAction
  | GetOrderActionError
  | GetLinesAction
  | GetLinesActionError
  | PickLineAction
  | PickLineActionError
  | FreeLineAction
  | FreeLineActionError
  | OccupyLineWithOrderAction
  | OccupyLineWithOrderActionError
  | GetMenuAction
  | GetMenuActionError
  | PickOrderAction
  | PickOrderActionError
  | CreateOrderAction
  | CreateOrderActionError
  | CloseOrderAction
  | CloseOrderActionError
  | DeleteOrderAction
  | DeleteOrderActionError
  | EnableReaderInputAction
  | DisableReaderInputAction
  | AddBreakStartAction
  | AddBreakStartActionError
  | AddBreakEndAction
  | AddBreakEndActionError
  | PauseOrderAction
  | ResumeOrderAction
  | SetOrderPauseStatusAction;

export type ModalAction =
  | OpenFinishModalAction
  | CloseModalAction
  | OpenDeleteModalAction
  | OpenDeleteRedirectionModalAction
  | OpenDeleteProductModalAction;

export type DashboardAction =
  | ChooseSidebarTabAction
  | InitLiveDataAction
  | InitLiveDataActionError
  | RefreshLiveDataAction;

export type WidsAction =
  | GetRedirectionsAction
  | GetRedirectionsActionError
  | StartEditingRedirectionAction
  | AddProductsToRedirectionAction
  | StartAddingProductsToRedirectionAction
  | StartAddingProductsToRedirectionActionError
  | AddRedirectionAction
  | AddRedirectionActionError
  | StartAddingRedirectionAction
  | SaveRedirectionAction
  | SaveRedirectionActionError
  | DeleteRedirectionAction
  | DeleteRedirectionActionError
  | BackToRedirectionsListAction
  | GetProductsAction
  | GetProductsActionError
  | UpdateProductsListAction
  | StartEditingProductAction
  | StartAddingProductAction
  | DeleteProductAction
  | DeleteProductActionError
  | BackToProductsListAction
  | AddProductAction
  | AddProductActionError
  | GetProductBeginAction
  | GetProductSuccessAction
  | GetProductActionError
  | AddLinkInProductAction
  | AddLinkInProductActionError
  | AddRedirectionInProductAction
  | AddRedirectionInProductActionError
  | DeleteConnectedLinkItemAction
  | DeleteConnectedLinkItemActionError
  | DeleteConnectedRedirectionItemAction
  | DeleteConnectedRedirectionItemActionError
  | SetMessageAction
  | SendProductsAction
  | UpdateManyProdsWithOneRedirAction
  | UpdateManyProdsWithOneRedirActionError;
