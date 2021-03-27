import { ActionTypes } from "../../actions";

export type DisableReaderInputAction = {
  type: ActionTypes.DISABLE_READER_INPUT;
  payload: { isDisabled: true };
};

export const disableReaderInput = (): DisableReaderInputAction => {
  return {
    type: ActionTypes.DISABLE_READER_INPUT,
    payload: { isDisabled: true },
  };
};
