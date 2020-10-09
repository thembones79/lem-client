import warningSound from "../components/sounds/warning.wav";
import okSound from "../components/sounds/ok.wav";
import errorSound from "../components/sounds/error.wav";

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

export const playProperSound = (existingOrder, _line) => {
  if (existingOrder) {
    const { scans } = existingOrder;
    const scansOnThisLine = scans.filter((scan) => scan._line === _line);
    if (scansOnThisLine.length > 0) {
      const lastScanCode = scansOnThisLine[0].errorCode;

      const renderSound = (code) => {
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
