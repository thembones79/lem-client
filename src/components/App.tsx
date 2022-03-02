import React from "react";
import Header from "./Header";
import "./AppStyle.scss";

const App = ({ children }: any) => {
  return (
    <div className="app">
      <Header />
      {children}
    </div>
  );
};

export default App;
