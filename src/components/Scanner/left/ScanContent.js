import React, { Component } from "react";
import { errors } from "../../../translations/errors";
import { renderTime } from "../../../utils/renderTime";
import CheckMarkIcon from "../../icons/CheckMarkIcon";
import CrossMarkIcon from "../../icons/CrossMarkIcon";
import "./ScanContentStyle.scss";

class ScanContent extends Component {
  renderError(code, language) {
    return (
      <div
        className={`scan-item__message ${
          code === "e000"
            ? "scan-item__message--good"
            : "scan-item__message--bad"
        }`}
      >
        {code ? errors[code][language] : ""}
      </div>
    );
  }

  renderMark(code) {
    return code === "e000" ? <CheckMarkIcon /> : <CrossMarkIcon />;
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
