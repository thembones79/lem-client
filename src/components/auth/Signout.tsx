import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { StoreState } from "../../reducers";
import { SignoutAction, IFreeLine } from "../../actions";
import "./SignoutStyle.scss";

interface ISignoutProps extends RouteComponentProps {
  lineId: string | null;
  signout: () => SignoutAction;
  freeLine: ({ lineId }: IFreeLine) => void;
}

class Signout extends Component<ISignoutProps> {
  componentDidMount() {
    const { lineId, freeLine } = this.props;
    if (lineId) {
      freeLine({ lineId }); // free ocuppied line
    }

    this.props.signout(); // sigout is a name of action creator
  }
  render() {
    return <div className="signout-page">Sorry to see you go</div>;
  }
}
function mapStateToProps(state: StoreState) {
  return { lineId: state.scanner.pickedLine || localStorage.getItem("line") };
}
export default connect(mapStateToProps, actions)(Signout);
