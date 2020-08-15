import React, { Component } from "react";
import { errors } from "../../translations/errors";

class ScanContent extends Component {
  concatenateZeroIfLessThanTen(number) {
    return number < 10 ? "0" + number : number;
  }

  renderError(code, language) {
    return code ? errors[code][language] : "";
  }

  renderTime(timeUTC) {
    if (!timeUTC) {
      return;
    }
    const localTime = new Date(timeUTC);
    const year = this.concatenateZeroIfLessThanTen(localTime.getFullYear());
    const month = this.concatenateZeroIfLessThanTen(localTime.getMonth() + 1);
    const day = this.concatenateZeroIfLessThanTen(localTime.getDate());
    const hours = this.concatenateZeroIfLessThanTen(localTime.getHours());
    const minutes = this.concatenateZeroIfLessThanTen(localTime.getMinutes());
    const seconds = this.concatenateZeroIfLessThanTen(localTime.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  render() {
    return (
      <div>
        <div>{this.renderTime(this.props.timeStamp)}</div>
        <div>
          {this.props.scanContent}
          <span>{this.renderError(this.props.errorCode, "en")}</span>
        </div>
      </div>
    );
  }
}

export default ScanContent;
