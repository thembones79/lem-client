import React, { Component } from "react";
import { errors } from "../../../translations/errors";
import { renderTime } from "../../../utils/renderTime";
import CheckMarkIcon from "../../icons/CheckMarkIcon";
import CrossMarkIcon from "../../icons/CrossMarkIcon";
import WarningIcon from "../../icons/WarningIcon";
import "./ScanContentStyle.scss";

interface IScanContentProps {
  timeStamp: string;
  errorCode: keyof typeof errors;
  scanContent: string;
}

class ScanContent extends Component<IScanContentProps> {
  renderError(code: IScanContentProps["errorCode"], language: "pl" | "en") {
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

  renderMark(code: IScanContentProps["errorCode"]) {
    if (code === "e000") {
      return <CheckMarkIcon />;
    } else if (code === "e004") {
      return <WarningIcon />;
    } else {
      return <CrossMarkIcon />;
    }
  }

  render() {
    const { errorCode, timeStamp, scanContent } = this.props;
    const { renderMark, renderError } = this;
    return (
      <div className="scan-item">
        <div className="scan-item__mark-content">
          <div className="scan-item__mark">{renderMark(errorCode)}</div>
          <div className="scan-item__content">
            <div className="scan-item__timestamp">{renderTime(timeStamp)}</div>
            {renderError(errorCode, "en")}
            <div className="scan-item__partnumber">{scanContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScanContent;
