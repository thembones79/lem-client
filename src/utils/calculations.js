export const getTactTime = (orderNumber, orders) => {
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

export const getBreaksTime = (_line, breaks) => {
  if (!_line || !breaks) {
    return 0;
  }
  const thisLineBreaksInsideLastCycle = breaks.filter(
    (item) => item._line === _line && item.breakEnd
  );

  const individualBreakTimes = thisLineBreaksInsideLastCycle.map(
    (item) =>
      new Date(item.breakEnd).getTime() - new Date(item.breakStart).getTime()
  );

  const arrSum = (arr) => arr.reduce((a, b) => a + b, 0);
  const breakTimesInMilliseconds = arrSum(individualBreakTimes);

  return breakTimesInMilliseconds;
};

export const getBreaksInLastCycle = (_line, ealierScan, laterScan) => {
  const earlier = new Date(ealierScan).getTime();
  const later = new Date(laterScan).getTime();
  const { breaks } = this.props.existingOrder;
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

export const getGrossDuration = (_line) => {
  if (this.props.existingOrder) {
    const { scans, orderAddedAt } = this.props.existingOrder;

    if (!_line || !scans || !orderAddedAt) {
      return 0;
    }
    const scansWithoutErrors = scans.filter(
      (scan) => scan.errorCode === "e000"
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
        (scan) => scan.errorCode === "e000" && scan._line === _line
      );

      // now we know that there are scans bun no on this line, so...
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

export const getNetDuration = (_line) => {
  if (this.props.existingOrder) {
    const { scans, orderAddedAt } = this.props.existingOrder;

    if (!_line || !scans || !orderAddedAt) {
      return 0;
    }
    const scansWithoutErrors = scans.filter(
      (scan) => scan.errorCode === "e000"
    );

    if (scansWithoutErrors.length === 0) {
      return 0;
    }
    if (scansWithoutErrors.length === 1) {
      return this.getGrossDuration(_line);
    } else {
      const scansWithoutErrorsOnThisLine = scans.filter(
        (scan) => scan.errorCode === "e000" && scan._line === _line
      );

      // now we know that there are scans bun no on this line, so...
      if (scansWithoutErrorsOnThisLine.length === 0) {
        return 0;
      }
      if (scansWithoutErrorsOnThisLine.length === 1) {
        // we can not measure this timestamp against orderAddedAt, so...
        return 0;
      } else {
        return this.getGrossDuration(_line) - this.getBreaksTime(_line);
      }
    }
  } else return 0;
};

export const getMeanCycleTime = (_line) => {
  if (this.props.existingOrder) {
    const { scans, orderAddedAt } = this.props.existingOrder;

    if (!_line || !scans || !orderAddedAt) {
      return 0;
    }
    const scansWithoutErrors = scans.filter(
      (scan) => scan.errorCode === "e000"
    );

    if (scansWithoutErrors.length === 0) {
      return 0;
    }
    if (scansWithoutErrors.length === 1) {
      return Math.floor(this.getNetDuration(_line) / 1000);
    } else {
      const scansWithoutErrorsOnThisLine = scans.filter(
        (scan) => scan.errorCode === "e000" && scan._line === _line
      );

      // now we know that there are scans bun no on this line, so...
      if (scansWithoutErrorsOnThisLine.length === 0) {
        return 0;
      }
      if (scansWithoutErrorsOnThisLine.length === 1) {
        // we can not measure this timestamp against orderAddedAt, so...
        return 0;
      } else {
        return Math.floor(
          this.getNetDuration(_line) /
            (scansWithoutErrorsOnThisLine.length - 1) /
            1000
        );
      }
    }
  } else return 0;
};

export const getLastCycleTime = (_line) => {
  if (this.props.existingOrder) {
    const { scans, orderAddedAt } = this.props.existingOrder;

    if (!_line || !scans || !orderAddedAt) {
      return 0;
    }
    const scansWithoutErrors = scans.filter(
      (scan) => scan.errorCode === "e000"
    );

    if (scansWithoutErrors.length === 0) {
      return 0;
    }
    if (scansWithoutErrors.length === 1) {
      return this.getNetDuration(_line);
    } else {
      const scansWithoutErrorsOnThisLine = scans.filter(
        (scan) => scan.errorCode === "e000" && scan._line === _line
      );

      // now we know that there are scans bun no on this line, so...
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

        const breakTimes = this.getBreaksInLastCycle(
          _line,
          scansWithoutErrorsOnThisLine[1].timeStamp,
          scansWithoutErrorsOnThisLine[0].timeStamp
        );

        return Math.floor((grossLastCycleMilliseconds - breakTimes) / 1000);
      }
    }
  } else return 0;
};

export const getEfficiency = (_line, orderNumber) => {
  const tt = this.getTactTime(orderNumber);
  const mct = this.getMeanCycleTime(_line);
  console.log({ tt, mct });
  if (!mct || !tt) return 0;
  return Math.floor((tt / mct) * 100);
};
