import React, { Component } from "react";
import ScanList from "./ScanList";
import ReaderInput from "./ReaderInput";

class Reader extends Component {
  render() {
    return (
      <div>
        <ScanList />
        <ReaderInput />
      </div>
    );
  }
}

export default Reader;
