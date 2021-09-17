import React, { Component } from "react";
import { ScanDetailsType } from "../../../actions";
import "./ScanDetailsStyle.scss";

interface IScanDetailsProps {
  scanDetails: ScanDetailsType[];
  expanded: boolean;
}

class ScanDetails extends Component<IScanDetailsProps> {
  renderTimestamps(scansTimestamps: string[]) {
    return scansTimestamps.map((timestamp) => (
      <div key={timestamp}>{timestamp}</div>
    ));
  }

  renderScanDetails() {
    const { scanDetails, expanded } = this.props;
    return scanDetails.map((details) => (
      <span key={details.scansLine} className="scan-details__line">
        <div className="scan-details__line__summary">
          <span>line {details.scansLine} - </span>
          <span className="weight700"> {details.scansSum}</span>
        </div>
        <div className="scan-details__line__timestamps">
          {expanded && this.renderTimestamps(details.scansTimestamps)}
        </div>
      </span>
    ));
  }

  render() {
    return <td className="scan-details">{this.renderScanDetails()}</td>;
  }
}

export default ScanDetails;
