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
        return "scan-item-v3__message--good";
      }

      if (code === "e004") {
        return "scan-item-v3__message--pretty";
      }

      return "scan-item-v3__message--bad";
    };

    return (
      <div className={`scan-item-v3__message ${messageClassName()}`}>
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
      <div className="scan-item-v3">
        <div className="scan-item-v3__mark-content">
          <div className="scan-item-v3__mark">{renderMark(errorCode)}</div>
          <div className="scan-item-v3__content">
            <div className="scan-item-v3__timestamp">
              {renderTime(timeStamp)}
            </div>
            {renderError(errorCode, "en")}
            <div className="scan-item-v3__partnumber">{scanContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScanContent;
