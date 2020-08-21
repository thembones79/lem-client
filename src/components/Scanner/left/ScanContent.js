import React, { Component } from "react";
import { errors } from "../../../translations/errors";
import { renderTime } from "../../../utils/renderTime";

class ScanContent extends Component {
  renderError(code, language) {
    return code ? errors[code][language] : "";
  }

  render() {
    return (
      <div>
        <div>{renderTime(this.props.timeStamp)}</div>
        <div>
          {this.props.scanContent}
          <span>{this.renderError(this.props.errorCode, "en")}</span>
        </div>
      </div>
    );
  }
}

export default ScanContent;
