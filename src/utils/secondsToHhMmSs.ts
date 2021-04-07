export const secondsToHhMmSs = (seconds: number) => {
  if (!seconds) {
    return "";
  }
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};
