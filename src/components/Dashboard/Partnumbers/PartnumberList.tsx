import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { PartnumberListType } from "../../../actions";
import { StoreState } from "../../../reducers";
import Loader from "../../Loader";
import SfTable, { IColumn } from "./SfTable";
import "../Orders/OrdersListStyle.scss";

interface IPartnumbersListProps {
  partnumbers?: PartnumberListType[];
  //  viewPartnumberDetails: (_id: string) => void;
  getPartnumbers: () => void;
  errorMessage: string;
  isLoading: boolean;
}

const columns: IColumn<any>[] = [
  { name: "partNumber", label: "partnumber" },
  { name: "givenHourlyRate", label: "givenHourlyRate" },
  { name: "suggestedHourlyRate", label: "suggestedHourlyRate" },
  { name: "givenTactTime", label: "givenTactTime" },
  { name: "suggestedTactTime", label: "suggestedTactTime" },
  { name: "xlsxTactTime", label: "xlsxTactTime" },
  { name: "automatic", label: "automatic" },
];

class PartnumbersList extends Component<IPartnumbersListProps> {
  componentDidMount() {
    this.props.getPartnumbers();
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { isLoading, errorMessage, partnumbers } = this.props;

    if (errorMessage) {
      return <div className="alert">{this.renderAlert()}</div>;
    }

    if (isLoading) {
      return <Loader />;
    }
    return partnumbers && <SfTable columns={columns} rows={partnumbers} />;
  }
}

function mapStateToProps(state: StoreState) {
  const { partnumbers, isLoading, errorMessage } = state.dashboard;
  return {
    partnumbers,
    isLoading,
    errorMessage,
  };
}

export default connect(mapStateToProps, actions)(PartnumbersList);
