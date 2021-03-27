import React, { Component } from "react";
import ScanList from "./ScanList";
import ReaderInput from "./ReaderInput";
import "./ReaderStyle.scss";

class Reader extends Component {
  render() {
    return (
      <div className="reader-panel">
        <ScanList />
        <ReaderInput />
      </div>
    );
  }
}

export default Reader;
