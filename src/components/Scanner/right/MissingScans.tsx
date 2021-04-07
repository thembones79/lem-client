import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { OrderType } from "../../../actions";
import { StoreState } from "../../../reducers";
import MissingScansIcon from "../../icons/MissingScansIcon";
import "./MissingScansStyle.scss";

interface IMissingScansProps {
  existingOrder?: OrderType;
}

class MissingScans extends Component<IMissingScansProps> {
  zeroAdder(number: number) {
    if (number < 0) {
      return "";
    }
    if (number < 10) {
      return `0000${number}`;
    }
    if (number < 100) {
      return `000${number}`;
    }
    if (number < 1000) {
      return `00${number}`;
    }
    if (number < 10000) {
      return `0${number}`;
    }

    return `${number}`;
  }

  generateCompleteScanList() {
    const quantity = this.props.existingOrder?.quantity || 1;

    let generatedScans = [];
    for (let i = 1; i <= quantity; i++) {
      generatedScans.push(this.zeroAdder(i));
    }
    return generatedScans;
  }

  findMissingScans(
    completeScanList: string[],
    scansWithoutErrors: (string | undefined)[]
  ) {
    if (!scansWithoutErrors || scansWithoutErrors.length === 0) {
      return completeScanList;
    } else {
      return completeScanList.filter((scan) => {
        let foundScans = 0;
        scansWithoutErrors.forEach((el) => {
          if (el === scan) {
            foundScans++;
          }
        });
        return foundScans === 0;
      });
    }
  }

  renderMissingScans() {
    if (this.props.existingOrder) {
      const { scans } = this.props.existingOrder;
      const scansWithoutErrors = scans
        ? scans
            .filter(
              (scan) => scan.errorCode === "e000" || scan.errorCode === "e004"
            )
            .map((scan) => scan?.scanContent?.substr(-5))
        : [];

      const completeScanList = this.generateCompleteScanList();

      const missingScans = this.findMissingScans(
        completeScanList,
        scansWithoutErrors
      );

      return missingScans.map((scan) => (
        <div key={scan} className="missing-scans__item">
          {scan}
        </div>
      ));
    }
  }
  render() {
    return (
      <div className="missing">
        <div className="missing-scans__label">
          {" "}
          <MissingScansIcon /> missing scans
        </div>
        <div className="missing-scans">{this.renderMissingScans()}</div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    existingOrder: state.scanner.existingOrder,
  };
}

export default connect(mapStateToProps, actions)(MissingScans);
