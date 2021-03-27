import { ActionTypes } from "../../actions";

export type EnableReaderInputAction = {
  type: ActionTypes.ENABLE_READER_INPUT;
  payload: { isDisabled: false };
};

export const enableReaderInput = (): EnableReaderInputAction => {
  return {
    type: ActionTypes.ENABLE_READER_INPUT,
    payload: { isDisabled: false },
  };
};
