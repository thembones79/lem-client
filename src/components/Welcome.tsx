import React, { Component } from "react";
import axios from "axios";
import "./WelcomeStyle.scss";

class Welcome extends Component {
  state = {
    apiVersion: "0.0.0",
    guiVersion: "0.0.0",
  };

  componentDidMount() {
    this.fetchGuiVersion();
    this.fetchApiVersion();
  }
  async fetchApiVersion() {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/thembones79/lem-server/master/package.json`
      );
      this.setState({ apiVersion: response.data.version });
    } catch (e) {
      this.setState({ apiVersion: e.message });
    }
  }

  async fetchGuiVersion() {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/thembones79/lem-client/master/package.json`
      );
      this.setState({ guiVersion: response.data.version });
    } catch (e) {
      this.setState({ guiVersion: e.message });
    }
  }

  render() {
    const { apiVersion, guiVersion } = this.state;
    return (
      <div className="welcome-page">
        <div className="centered-logo">
          <img
            className="riverdi-lem-logo--big"
            alt="RiverdiLEM Logo"
            src="RiverdiLemLogo5.svg"
          />
        </div>
        <div className="changelog">
          <p>
            Changelog: GUI{" "}
            <a
              href="https://github.com/thembones79/lem-client/blob/master/CHANGELOG.md#changelog"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>v{guiVersion}</b>
            </a>
            , API{" "}
            <a
              href="https://github.com/thembones79/lem-server/blob/master/CHANGELOG.md#changelog"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>v{apiVersion}</b>
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Welcome;
