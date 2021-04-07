import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL } from "../../config";

export type OrderStatsType = {
  lineDescription: string;
  lineOccupiedWith: string;
  lineStatus: string;
  _id: string;
  orderStatus: string;
  orderNumber: string;
  orderAddedAt: number;
  orderAddedAtProcessed: number;
  newestScan: number;
  lastScan: number;
  quantity: number;
  partNumber: string;
  customer: string;
  tactTime: number;
  breaks: number;
  validScans: number;
  duplicatedScans: number;
  wrongCodeScans: number;
  grossTimeSoFar: number;
  grossDurationInMilliseconds: number;
  netTimeSoFar: number;
  netDurationInMilliseconds: number;
  breakTime: number;
  breakTimesInMilliseconds: number;
  finishedBreaks: number;
  meanCycleTimeInMilliseconds: number;
  meanCycleTime: number;
  lastCycleTimeInMilliseconds: number;
  lastCycleTime: number;
  efficiency: number;
  estimatedDuration: number;
  estimatedCompletionTime: number;
  realCompletionTime: number;
};

export type InitLiveDataAction = {
  type: ActionTypes.INIT_LIVEDATA;
  payload: OrderStatsType;
};

export type InitLiveDataActionError = {
  type: ActionTypes.INIT_LIVEDATA_ERROR;
  payload: string;
};

export const initLiveData = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${ROOT_URL}/api/liveview`, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch<InitLiveDataAction>({
      type: ActionTypes.INIT_LIVEDATA,
      payload: response.data.liveView,
    });
  } catch (e) {
    dispatch<InitLiveDataActionError>({
      type: ActionTypes.INIT_LIVEDATA_ERROR,
      payload: "could not contact the API",
    });
  }
};
