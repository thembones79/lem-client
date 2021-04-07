//@ts-ignore
import warningSound from "../components/sounds/warning_louder2.wav";
//@ts-ignore
import okSound from "../components/sounds/ok_louder.wav";
//@ts-ignore
import errorSound from "../components/sounds/error.wav";

import { OrderType } from "../actions";

const warningSfx = new Audio(warningSound);
const errorSfx = new Audio(errorSound);
const okSfx = new Audio(okSound);

const playWarning = () => {
  warningSfx.play();
};

const playError = () => {
  errorSfx.play();
};

const playOk = () => {
  okSfx.play();
};

export const playProperSound = (existingOrder: OrderType, _line: string) => {
  if (existingOrder) {
    const { scans } = existingOrder;
    const scansOnThisLine = scans
      ? scans.filter((scan) => scan._line === _line)
      : [];
    if (scansOnThisLine.length > 0) {
      const lastScanCode = scansOnThisLine[0].errorCode;

      const renderSound = (code?: string) => {
        if (code === "e000") {
          playOk();
        } else if (code === "e004") {
          playWarning();
        } else {
          playError();
        }
      };
      renderSound(lastScanCode);
    }
  }
};
