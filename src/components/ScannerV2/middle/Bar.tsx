import React from "react";

export interface IBar {
  active?: boolean;
  value: number;
  max: number;
}

const Bar = ({ active, value, max }: IBar) => (
  <div
    className={`game__bar${active ? "--active" : ""}`}
    style={{
      color: "red",
      width: "26px",
      height: `${(300 * value) / max}px`,

      margin: "20px",
      borderRadius: "26px",
    }}
  ></div>
);

export default Bar;
