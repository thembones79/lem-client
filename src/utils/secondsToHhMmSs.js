export const secondsToHhMmSs = (seconds) => {
  if (!seconds) {
    return;
  }
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};
