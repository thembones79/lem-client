export interface IGetColor {
  givenTime: number;
  actualTime: number;
}

export type ColorType = "green" | "red" | "yellow" | "blue";

export const getColor = ({ givenTime, actualTime }: IGetColor): ColorType => {
  const percentage = (actualTime / givenTime) * 100;
  if (percentage <= 100) return "green";
  if (percentage > 100 && percentage < 115) return "yellow";
  if (percentage >= 115) return "red";
  return "blue";
};
