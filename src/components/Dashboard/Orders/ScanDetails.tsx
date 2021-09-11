import React, { Component } from "react";
import { ScanDetailsType } from "../../../actions";

interface IScanDetailsProps {
  scanDetails: ScanDetailsType[];
}

class ScanDetails extends Component<IScanDetailsProps> {
  state = {
    expanded: false,
  };

  renderTimestamps(scansTimestamps: string[]) {
    return scansTimestamps.map((timestamp) => (
      <div key={timestamp}>{timestamp}</div>
    ));
  }

  render() {
    const { scanDetails } = this.props;
    return scanDetails.map((details) => (
      <td
        key={details.scansLine}
        onClick={() => this.setState({ expanded: !this.state.expanded })}
      >
        <div>
          <span>line {details.scansLine}:</span>
          <span>{details.scansSum}</span>
        </div>
        <div>
          {this.state.expanded &&
            this.renderTimestamps(details.scansTimestamps)}
        </div>
      </td>
    ));
  }
}

export default ScanDetails;
