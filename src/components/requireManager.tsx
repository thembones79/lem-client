import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { StoreState } from "../reducers";

interface IComposedComponentProps extends RouteComponentProps {
  auth: string | null;
  userType: string;
}

export default (ChildComponent: React.ElementType) => {
  class ComposedComponent extends Component<IComposedComponentProps> {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (this.props.userType) {
        if (this.props.userType !== "manager") {
          this.props.history.push("/");
        }
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state: StoreState) {
    return { auth: state.auth.authenticated, userType: state.scanner.userType };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
