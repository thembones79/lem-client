import React, { Component } from "react";

class ScanContent extends Component {
  render() {
    return (
      <div>
        <div>{this.props.timeStamp}</div>
        <div>
          {this.props.scanContent}
          <span>{this.props.errorCode}</span>
        </div>
      </div>
    );
  }
}

export default ScanContent;
