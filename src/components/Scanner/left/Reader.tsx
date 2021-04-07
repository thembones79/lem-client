import React, { Component } from "react";
import { connect } from "react-redux";
import ScanList from "./ScanList";
import ReaderInput from "./ReaderInput";
import { StoreState } from "../../../reducers";
import "./ReaderStyle.scss";

interface IReaderProps {
  ReaderInput: React.ElementType;
}

class Reader extends Component<IReaderProps> {
  render() {
    const { ReaderInput } = this.props;
    return (
      <div className="reader-panel">
        <ScanList />
        <ReaderInput />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return { auth: state.auth.authenticated, ReaderInput };
}

export default connect(mapStateToProps)(Reader);
