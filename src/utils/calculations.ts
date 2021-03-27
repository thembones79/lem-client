import { renderTime } from "./renderTime";

export const getTactTime = ({ orderNumber, menuContent }) => {
  const orders = menuContent;
  if (!orderNumber || !orders) {
    return 0;
  }
  const orderDetails = orders.filter(
    (order) => order.orderNumber === orderNumber
  )[0];
  if (!orderDetails) {
    return 0;
  }
  return orderDetails.tactTime;
};

export const getBreaksTime = ({ _line, existingOrder }) => {
  if (existingOrder && _line) {
    const { breaks, scans } = existingOrder;
    if (!_line || !breaks || !scans || scans.length === 0) {
      return 0;
    }

    const scansWithoutErrorsOnThisLine = scans.filter(
      (scan) =>
        (scan.errorCode === "e000" || scan.errorCode === "e004") &&
        scan._line === _line
    );

    if (scansWithoutErrorsOnThisLine.length === 0) {
      return 0;
    }
    const newestScan = new Date(
      scansWithoutErrorsOnThisLine[0].timeStamp
    ).getTime();

    const oldestScan = new Date(
      scansWithoutErrorsOnThisLine[
        scansWithoutErrorsOnThisLine.length - 1
      ].timeStamp
    ).getTime();

    const thisLineBreaksInsideLastCycle = breaks.filter(
      (item) =>
        item._line === _line &&
        item.breakEnd &&
        new Date(item.breakEnd).getTime() < newestScan &&
        new Date(item.breakStart).getTime() > oldestScan
    );

    const individualBreakTimes = thisLineBreaksInsideLastCycle.map(
      (item) =>
        new Date(item.breakEnd).getTime() - new Date(item.breakStart).getTime()
    );

    const arrSum = (arr) => arr.reduce((a, b) => a + b, 0);
    const breakTimesInMilliseconds = arrSum(individualBreakTimes);

    return breakTimesInMilliseconds;
  }
};

export const getBreaksInLastCycle = ({
  _line,
  ealierScan,
  laterScan,
  existingOrder,
}) => {
  const earlier = new Date(ealierScan).getTime();
  const later = new Date(laterScan).getTime();
  const { breaks } = existingOrder;
  if (!_line || !breaks) {
    return 0;
  }
  const thisLineBreaksInsideLastCycle = breaks.filter(
    (item) =>
      item._line === _line &&
      new Date(item.breakEnd).getTime() < later &&
      new Date(item.breakStart).getTime() > earlier
  );

  const individualBreakTimes = thisLineBreaksInsideLastCycle.map(
    (item) =>
      new Date(item.breakEnd).getTime() - new Date(item.breakStart).getTime()
  );

  const arrSum = (arr) => arr.reduce((a, b) => a + b, 0);
  const breakTimesInMilliseconds = arrSum(individualBreakTimes);

  return breakTimesInMilliseconds;
};

export const getGrossDuration = ({ _line, existingOrder }) => {
  if (existingOrder) {
    const { scans, orderAddedAt } = existingOrder;

    if (!_line || !scans || !orderAddedAt) {
      return 0;
    }
    const scansWithoutErrors = scans.filter(
      (scan) => scan.errorCode === "e000" || scan.errorCode === "e004"
    );

    if (scansWithoutErrors.length === 0) {
      return 0;
    }
    if (scansWithoutErrors.length === 1) {
      const grossDurationInMilliseconds =
        new Date(scansWithoutErrors[0].timeStamp).getTime() -
        new Date(orderAddedAt).getTime();

      return grossDurationInMilliseconds;
    } else {
      const scansWithoutErrorsOnThisLine = scans.filter(
        (scan) =>
          (scan.errorCode === "e000" || scan.errorCode === "e004") &&
          scan._line === _line
      );

      // now we know that there are scans but no on this line, so...
      if (scansWithoutErrorsOnThisLine.length === 0) {
        return 0;
      }
      if (scansWithoutErrorsOnThisLine.length === 1) {
        // we can not measure this timestamp against orderAddedAt, so...
        return 0;
      } else {
        const grossDurationInMilliseconds =
          new Date(scansWithoutErrorsOnThisLine[0].timeStamp).getTime() -
          new Date(
            scansWithoutErrorsOnThisLine[
              scansWithoutErrorsOnThisLine.length - 1
            ].timeStamp
          ).getTime();

        return grossDurationInMilliseconds;
      }
    }
  } else return 0;
};

export const getNetDuration = ({ _line, existingOrder }) => {
  if (existingOrder) {
    const { scans, orderAddedAt } = existingOrder;

    if (!_line || !scans || !orderAddedAt) {
      return 0;
    }
    const scansWithoutErrors = scans.filter(
      (scan) => scan.errorCode === "e000" || scan.errorCode === "e004"
    );

    if (scansWithoutErrors.length === 0) {
      return 0;
    }
    if (scansWithoutErrors.length === 1) {
      return getGrossDuration(_line);
    } else {
      const scansWithoutErrorsOnThisLine = scans.filter(
        (scan) =>
          (scan.errorCode === "e000" || scan.errorCode === "e004") &&
          scan._line === _line
      );

      // now we know that there are scans but no on this line, so...
      if (scansWithoutErrorsOnThisLine.length === 0) {
        return 0;
      }
      if (scansWithoutErrorsOnThisLine.length === 1) {
        // we can not measure this timestamp against orderAddedAt, so...
        return 0;
      } else {
        return (
          getGrossDuration({ _line, existingOrder }) -
          getBreaksTime({ _line, existingOrder })
        );
      }
    }
  } else return 0;
};

export const getMeanCycleTime = ({ _line, existingOrder }) => {
  if (existingOrder) {
    const { scans, orderAddedAt } = existingOrder;

    if (!_line || !scans || !orderAddedAt) {
      return 0;
    }
    const scansWithoutErrors = scans.filter(
      (scan) => scan.errorCode === "e000" || scan.errorCode === "e004"
    );

    if (scansWithoutErrors.length === 0) {
      return 0;
    }
    if (scansWithoutErrors.length === 1) {
      return Math.floor(getNetDuration({ _line, existingOrder }) / 1000);
    } else {
      const scansWithoutErrorsOnThisLine = scans.filter(
        (scan) =>
          (scan.errorCode === "e000" || scan.errorCode === "e004") &&
          scan._line === _line
      );

      // now we know that there are scans but no on this line, so...
      if (scansWithoutErrorsOnThisLine.length === 0) {
        return 0;
      }
      if (scansWithoutErrorsOnThisLine.length === 1) {
        // we can not measure this timestamp against orderAddedAt, so...
        return 0;
      } else {
        return Math.floor(
          getNetDuration({ _line, existingOrder }) /
            (scansWithoutErrorsOnThisLine.length - 1) /
            1000
        );
      }
    }
  } else return 0;
};

export const getLastCycleTime = ({ _line, existingOrder }) => {
  if (existingOrder) {
    const { scans, orderAddedAt } = existingOrder;

    if (!_line || !scans || !orderAddedAt) {
      return 0;
    }
    const scansWithoutErrors = scans.filter(
      (scan) => scan.errorCode === "e000" || scan.errorCode === "e004"
    );

    if (scansWithoutErrors.length === 0) {
      return 0;
    }
    if (scansWithoutErrors.length === 1) {
      return getNetDuration({ _line, existingOrder });
    } else {
      const scansWithoutErrorsOnThisLine = scans.filter(
        (scan) =>
          (scan.errorCode === "e000" || scan.errorCode === "e004") &&
          scan._line === _line
      );

      // now we know that there are scans but no on this line, so...
      if (scansWithoutErrorsOnThisLine.length === 0) {
        return 0;
      }
      if (scansWithoutErrorsOnThisLine.length === 1) {
        // we can not measure this timestamp against orderAddedAt, so...
        return 0;
      } else {
        const grossLastCycleMilliseconds =
          new Date(scansWithoutErrorsOnThisLine[0].timeStamp).getTime() -
          new Date(scansWithoutErrorsOnThisLine[1].timeStamp).getTime();

        const breakTimes = getBreaksInLastCycle({
          _line,
          ealierScan: scansWithoutErrorsOnThisLine[1].timeStamp,
          laterScan: scansWithoutErrorsOnThisLine[0].timeStamp,
          existingOrder,
        });

        return Math.floor((grossLastCycleMilliseconds - breakTimes) / 1000);
      }
    }
  } else return 0;
};

export const getEfficiency = ({
  _line,
  orderNumber,
  menuContent,
  existingOrder,
}) => {
  const tt = getTactTime({ orderNumber, menuContent });
  const mct = getMeanCycleTime({ _line, existingOrder });

  if (!mct || !tt) return 0;
  return Math.floor((tt / mct) * 100);
};

export const getEstDuration = ({ existingOrder, _line }) => {
  if (existingOrder && _line) {
    const { quantity } = existingOrder;
    const breaksTime = Math.floor(
      getBreaksTime({ _line, existingOrder }) / 1000
    );
    return getMeanCycleTime({ _line, existingOrder }) * quantity + breaksTime;
  } else return 0;
};

export const getEstCompletionTime = ({ existingOrder, _line }) => {
  if (existingOrder && _line) {
    const { orderAddedAt } = existingOrder;
    const estCompletionTimestamp =
      getEstDuration({ _line, existingOrder }) * 1000 +
      new Date(orderAddedAt).getTime();
    return renderTime(estCompletionTimestamp);
  } else return "---- -- -- --:--:--";
};

export const getRealDuration = ({ existingOrder, _line }) => {
  if (existingOrder && _line) {
    return Math.floor(getGrossDuration({ _line, existingOrder }) / 1000);
  } else return 0;
};

export const getRealCompletionTime = ({ existingOrder, _line }) => {
  if (existingOrder && _line) {
    const { scans } = existingOrder;
    if (scans[0]) {
      const realCompletionTimestamp = scans[0].timeStamp;
      return renderTime(realCompletionTimestamp);
    }
  } else return "---- -- -- --:--:--";
};
