import React, { Component } from "react";
import "./LinkBlockStyle.scss";

interface ILinkBlockProps {
  description: string;
  url: string;
}

class LinkBlock extends Component<ILinkBlockProps> {
  handleClick = (url: string) => {
    const win = window.open(url, "_blank");
    if (win) {
      win.focus();
    }
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

export default LinkBlock;
