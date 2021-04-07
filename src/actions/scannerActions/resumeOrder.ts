import { ActionTypes } from "../../actions";

export type ResumeOrderAction = {
  type: ActionTypes.RESUME_ORDER;
  payload: { isRunning: true };
};

export const resumeOrder = (): ResumeOrderAction => {
  return {
    type: ActionTypes.RESUME_ORDER,
    payload: { isRunning: true },
  };
};
