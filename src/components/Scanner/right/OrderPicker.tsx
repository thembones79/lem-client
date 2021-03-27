import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { renderTime } from "../../../utils/renderTime";
import OrderIcon from "../../icons/OrderIcon";
import "./OrderPickerStyle.scss";

class OrderPicker extends Component {
  componentDidMount() {
    this.props.getMenu();
  }

  handleOrderChange = (formProps) => {
    const orderNumber = formProps.target.value;
    const { _line } = this.props;
    this.props.pickOrder({ orderNumber });
    this.props.getOrder({ orderNumber });
    this.props.occupyLineWithOrder({ _line, orderNumber });
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  renderTimestamp() {
    if (this.props.menu) {
      const { timestamp } = this.props.menu;
      return <span>(Sync time: {renderTime(timestamp)})</span>;
    }
  }

  renderOptions() {
    if (this.props.menu) {
      const orders = this.props.menu.menuContent;

      return (
        <>
          {orders.map((order) => {
            const { _id, orderNumber, quantity, customer, partNumber } = order;
            return (
              <option
                key={_id}
                value={orderNumber}
                children={`${orderNumber} - ${customer} - ${partNumber} - [${quantity}]`}
              />
            );
          })}
        </>
      );
    }
  }

  render() {
    const isReaderInputEnabled = !this.props.readerInputState.isDisabled;
    const isLineMissing = this.props._line ? false : true;
    return (
      <div>
        <form>
          <fieldset className="order-picker">
            <label className="order-picker__label" htmlFor="order">
              <OrderIcon /> order{" "}
              <span className="order-picker__label--sync-time">
                {" "}
                {this.renderTimestamp()}
              </span>
            </label>
            <Field
              name="order"
              type="text"
              component="select"
              className="order-picker__select"
              onChange={this.handleOrderChange}
              required
              // because it will be always opposite to reader input enabled/disabled state
              disabled={isReaderInputEnabled || isLineMissing}
            >
              <option className="order-picker__option" />
              {this.renderOptions()}
            </Field>
          </fieldset>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: { order: localStorage.getItem("order") },
    userName: state.scanner.userName,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    enableReinitialize: true,
    _line: state.scanner.pickedLine || localStorage.getItem("line"),
    menu: state.scanner.menu,
    readerInputState: state.scanner.readerInputState,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "orderPicker" })
)(OrderPicker);
