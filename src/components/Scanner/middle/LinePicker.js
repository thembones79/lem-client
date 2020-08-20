import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";

class LinePicker extends Component {
  componentDidMount() {
    this.props.getLines();
    //   this.props.loadLine({ line: localStorage.getItem("line") });
  }

  handleLineChange = (formProps) => {
    const currentLineId = this.props.initialValues.line;
    const newLineId = formProps.target.value;
    const userName = this.props.userName;
    //  this.props.loadLine({ line: localStorage.getItem("line") });
    this.props.pickLine(currentLineId, newLineId, userName);
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
    }
  }

  renderOptions() {
    if (this.props.lines) {
      const userName = this.props.userName;
      const filteredLines = this.props.lines.filter(
        (line) => line.lineStatus === "free" || line.lineStatus === userName
      );

      return (
        <>
          {filteredLines.map((line) => (
            <option
              key={line._id}
              value={line._id}
              children={line.lineDescription}
            />
          ))}
        </>
      );
    }
  }

  render() {
    return (
      <div>
        <form>
          <fieldset>
            <label htmlFor="line">line</label>
            <Field
              name="line"
              type="text"
              component="select"
              onChange={this.handleLineChange}
              required
            >
              <option />
              {this.renderOptions()}
            </Field>
          </fieldset>
          <div>{this.renderAlert()}</div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    initialValues: { line: localStorage.getItem("line") },
    userName: state.scanner.userName,
    line: state.scanner.pickedLine || localStorage.getItem("line"),
    enableReinitialize: true,
    lines: state.scanner.lines,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "linePicker" })
)(LinePicker);
