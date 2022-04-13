import React from "react";

export interface IBar {
  active?: boolean;
  value: number;
  max: number;
}

const Bar = ({ active, value, max }: IBar) => (
  <div
    className={`game-v3__bar${active ? "--active" : ""}`}
    style={{
      color: "red",
      width: "1.9vw",
      height: `${(20 * value) / max}vh`,
      margin: "1vw",
      borderRadius: "1.5vw",
    }}
  ></div>
);

export default Bar;
