import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ScanContent from "./ScanContent";

class ScanList extends Component {
  componentDidMount() {
    this.props.getOrder("20/832");
  }
  render() {
    return (
      <div>
        {this.props.existingOrder.scans.map((scan) => (
          <ScanContent
            key={scan._id}
            timeStamp={scan.timeStamp}
            errorCode={scan.errorCode}
            scanContent={scan.scanContent}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.scanner.message,
    authenticated: state.auth.authenticated,
    userType: state.scanner.userType,
    userName: state.scanner.userName,
    userId: state.scanner.userId,
    existingOrder: state.scanner.existingOrder,
  };
}

export default connect(mapStateToProps, actions)(ScanList);
