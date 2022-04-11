import React from "react";

export interface IBar {
  active?: boolean;
}

const Bar = ({ active }: IBar) => (
  <div
    className={`game__bar${active ? "--active" : ""}`}
    style={{
      color: "red",
      width: "26px",
      height: "226px",

      margin: "20px",
      borderRadius: "26px",
    }}
  ></div>
);

export default Bar;
