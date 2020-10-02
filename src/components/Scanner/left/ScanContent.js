import React, { Component } from "react";
import { errors } from "../../../translations/errors";
import { renderTime } from "../../../utils/renderTime";
import CheckMarkIcon from "../../icons/CheckMarkIcon";
import CrossMarkIcon from "../../icons/CrossMarkIcon";
import WarningIcon from "../../icons/WarningIcon";

import "./ScanContentStyle.scss";

class ScanContent extends Component {
  renderError(code, language) {
    const messageClassName = () => {
      if (code === "e000") {
        return "scan-item__message--good";
      }

      if (code === "e004") {
        return "scan-item__message--pretty";
      }

      return "scan-item__message--bad";
    };

    return (
      <div className={`scan-item__message ${messageClassName()}`}>
        {code ? errors[code][language] : ""}
      </div>
    );
  }

  renderMark(code) {
    if (code === "e000") {
      return <CheckMarkIcon />;
    } else if (code === "e004") {
      return <WarningIcon />;
    } else {
      return <CrossMarkIcon />;
    }
  }

  render() {
    return (
      <div className="scan-item">
        <div className="scan-item__mark-content">
          <div className="scan-item__mark">
            {this.renderMark(this.props.errorCode)}
          </div>
          <div className="scan-item__content">
            <div className="scan-item__timestamp">
              {renderTime(this.props.timeStamp)}
            </div>
            <div className="scan-item__partnumber">
              {this.props.scanContent}{" "}
            </div>
          </div>
        </div>
        {this.renderError(this.props.errorCode, "en")}
      </div>
    );
  }
}

export default ScanContent;
