import React, { Component } from "react";
import requireAuth from "./requireAuth";

class Scanner extends Component {
  render() {
    return <div>This is the scanner</div>;
  }
}

export default requireAuth(Scanner);
