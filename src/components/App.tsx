import React from "react";
import Header from "./Header";
import "./AppStyle.scss";

export default ({ children }) => {
  return (
    <div className="app">
      <Header />
      {children}
    </div>
  );
};
