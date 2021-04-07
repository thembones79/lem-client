import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { OrderType, IGetOrder } from "../../../actions";
import { StoreState } from "../../../reducers";
import ScanContent from "./ScanContent";
import "./ScanListStyle.scss";

interface IScanListProps {
  orderNumber?: string | null;
  _line?: string | null;
  existingOrder?: OrderType;
  isOrderedQuantityMatchesValidScansQuantity?: boolean;
  getOrder: ({ orderNumber }: IGetOrder) => void;
  ScanContent: React.ElementType;
}
class ScanList extends Component<IScanListProps> {
  resultsDiv: React.RefObject<HTMLDivElement> = React.createRef();

  scrollComponentToTop() {
    //@ts-ignore
    this.resultsDiv.current.scrollTo({
      top: 0,
      left: 0,
      // behavior: "smooth",
    });
  }

  componentDidMount() {
    const { orderNumber, getOrder } = this.props;
    if (orderNumber) {
      getOrder({ orderNumber });
    }
  }

  componentDidUpdate(prevProps: IScanListProps) {
    this.scrollComponentToTop();
  }

  renderScanList() {
    if (this.props.existingOrder) {
      const { scans } = this.props.existingOrder;
      const { _line, ScanContent } = this.props;
      const scansOnThisLine = scans?.filter((scan) => scan._line === _line);

      return scansOnThisLine?.map((scan) => (
        <ScanContent
          key={scan._id}
          timeStamp={scan.timeStamp}
          errorCode={scan.errorCode}
          scanContent={scan.scanContent}
        />
      ));
    }
  }

  render() {
    return (
      <div
        className="scan-list"
        ref={this.resultsDiv as React.RefObject<HTMLDivElement>}
      >
        {this.renderScanList()}
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    _line: state.scanner.pickedLine || localStorage.getItem("line"),
    existingOrder: state.scanner.existingOrder,
    isOrderedQuantityMatchesValidScansQuantity:
      state.scanner.isOrderedQuantityMatchesValidScansQuantity,
    enableReinitialize: true,
    ScanContent,
  };
}

export default connect(mapStateToProps, actions)(ScanList);
