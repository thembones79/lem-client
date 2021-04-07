import { ActionTypes, OrderStatsType } from "../../actions";

export interface IRefreshLiveData {
  liveView: OrderStatsType;
}

export type RefreshLiveDataAction = {
  type: ActionTypes.REFRESH_LIVEDATA;
  payload: OrderStatsType;
};

export const refreshLiveData = (
  data: IRefreshLiveData
): RefreshLiveDataAction => {
  return {
    type: ActionTypes.REFRESH_LIVEDATA,
    payload: data.liveView,
  };
};
