import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { renderTime } from "../../../utils/renderTime";

class OrderPicker extends Component {
  componentDidMount() {
    this.props.getMenu();
  }

  handleOrderChange = (formProps) => {
    const orderNumber = formProps.target.value;
    this.props.pickOrder(orderNumber);
    this.props.getOrder(orderNumber);
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
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
    return (
      <div>
        <form>
          <fieldset>
            <label htmlFor="order">order {this.renderTimestamp()}</label>
            <Field
              name="order"
              type="text"
              component="select"
              onChange={this.handleOrderChange}
              required
              // because it will be always opposite to reader input enabled/disabled state
              disabled={isReaderInputEnabled}
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
    initialValues: { order: localStorage.getItem("order") },
    userName: state.scanner.userName,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    enableReinitialize: true,
    menu: state.scanner.menu,
    readerInputState: state.scanner.readerInputState,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "orderPicker" })
)(OrderPicker);
