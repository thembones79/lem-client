import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, OrderType, HourlyRatesType } from "../../actions";
import { ROOT_URL, headers } from "../../config";
import { playProperSound } from "../../utils/audioPlayer";

export interface IInsertScan {
  scanContent: string;
  _line: string;
  _user: string;
  orderNumber: string;
}

export type OrderStatisticsType = {
  absoluteTime: string;
  givenHourlyRate: number;
  givenTactTime: number;
  grossTime: string;
  lastValidScan: string;
  linesUsed: string;
  meanCycleTime: string;
  meanCycleTimeInMilliseconds: number;
  meanGrossHourlyRate: number;
  meanHourlyRate: number;
  netTime: string;
  orderAddedAt: string;
  orderNumber: string;
  orderStatus: string;
  partNumber: string;
  quantity: number;
  scansAlready: number;
  validScans: number;
  xlsxTactTime: number;
  _orderId: string;
};

export type InsertScanAction = {
  type: ActionTypes.INSERT_SCAN;
  payload: {
    existingOrder: OrderType;
    orderStats: OrderStatisticsType;
    hourlyRates: HourlyRatesType[];
  };
};

export type InsertScanActionError = {
  type: ActionTypes.INSERT_SCAN_ERROR;
  payload: string;
};

export const insertScan =
  ({ scanContent, _line, _user, orderNumber }: IInsertScan) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        `${ROOT_URL}/api/scan`,
        {
          scanContent,
          _line,
          _user,
          orderNumber,
        },
        {
          headers,
        }
      );
      dispatch<InsertScanAction>({
        type: ActionTypes.INSERT_SCAN,
        payload: response.data,
      });
      playProperSound(response.data.existingOrder, _line);
    } catch (e: any) {
      dispatch<InsertScanActionError>({
        type: ActionTypes.INSERT_SCAN_ERROR,
        payload: "e.response.data.error",
      });
    }
  };
