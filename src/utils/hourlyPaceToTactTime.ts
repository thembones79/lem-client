export const hourlyPaceToTactTime = (hourlyPace: number) =>
  Math.floor(3600 / hourlyPace) || 0;
