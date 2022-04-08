import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { by } from "../../../utils/by";
import * as actions from "../../../actions";
import { LineType, IPickLine } from "../../../actions";
import { StoreState } from "../../../reducers";
import LineIcon from "../../icons/LineIcon";
import "./LinePickerStyle.scss";

interface ILinePickerProps {
  errorMessage: string;
  initialValues: {
    line: string | null;
  };
  userName: string;
  line: string | null;
  isPaused: boolean;
  lines: LineType[];
  readerInputState: {
    isDisabled: boolean;
  };
  getLines: () => void;
  pickLine: ({ currentLineId, newLineId, userName }: IPickLine) => void;
}

interface IFormProps extends React.ChangeEvent<HTMLInputElement> {
  line: string;
}

class LinePicker extends Component<
  InjectedFormProps<IFormProps> & ILinePickerProps
> {
  componentDidMount() {
    this.props.getLines();
  }

  handleLineChange = (formProps: IFormProps) => {
    const currentLineId = this.props.initialValues.line;
    const newLineId = formProps.target.value;
    const userName = this.props.userName;

    this.props.pickLine({ currentLineId, newLineId, userName });
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
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
          {filteredLines.sort(by("lineDescription")).map((line) => (
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

  renderLineComponent() {
    const isReaderInputEnabled = !this.props.readerInputState.isDisabled;
    if (isReaderInputEnabled) {
      const filteredLine = this.props.lines.filter(
        (line) => line._id === this.props.line
      );
      if (filteredLine[0]) {
        return (
          <div className="chosen-line">
            LINE - {filteredLine[0].lineDescription.toUpperCase()}
          </div>
        );
      }
      return <div>Pick a line...</div>;
    }

    return (
      <form>
        <fieldset className="line-picker">
          <label className="line-picker__label" htmlFor="line">
            <LineIcon /> line
          </label>
          <Field
            name="line"
            type="text"
            component="select"
            className="line-picker__select"
            onChange={this.handleLineChange}
            required
            // because it will be always opposite to reader input enabled/disabled state
            disabled={isReaderInputEnabled}
          >
            <option />
            {this.renderOptions()}
          </Field>
        </fieldset>
      </form>
    );
  }

  render() {
    return <div>{this.renderLineComponent()}</div>;
  }
}

function mapStateToProps(state: StoreState) {
  return {
    errorMessage: state.auth.errorMessage,
    initialValues: { line: localStorage.getItem("line") },
    userName: state.scanner.userName,
    line: state.scanner.pickedLine || localStorage.getItem("line"),
    enableReinitialize: true,
    isPaused: state.scanner.isPaused,
    lines: state.scanner.lines,
    readerInputState: state.scanner.readerInputState,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "linePicker" })
)(LinePicker) as ElementType;
