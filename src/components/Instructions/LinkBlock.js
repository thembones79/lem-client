import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./LinkBlockStyle.scss";

class LinkBlock extends Component {
  handleClick = (url) => {
    const win = window.open(url, "_blank");
    win.focus();
  };

  render() {
    const { description, url } = this.props;
    return (
      <button
        className="link-block "
        onClick={() => {
          this.handleClick(url);
        }}
      >
        {description}
      </button>
    );
  }
}

export default connect(null, actions)(LinkBlock);
