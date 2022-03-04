export const tactTimeToHourlyPace = (tactTime: number) =>
  Math.ceil(3600 / tactTime) || 0;
