import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";

class OrderPicker extends Component {
  componentDidMount() {
    this.props.getMenu();
    // this.props.loadOrder({ order: localStorage.getItem("order") });
  }

  handleOrderChange = (formProps) => {
    const orderNumber = formProps.target.value;
    /*
    const currentorderId = this.props.initialValues.order;
    const neworderId = formProps.target.value;
    const userName = this.props.userName;
    this.props.loadorder({ order: localStorage.getItem("order") });
    this.props.pickorder(currentorderId, neworderId, userName);

    */
    this.props.pickOrder(orderNumber);
    console.log({ val: formProps.target.value });
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
    }
  }

  renderOptions() {
    if (this.props.menu) {
      const orders = this.props.menu.menuContent;
      console.log(orders);
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
    console.log({ propsiki: this.props });
    return (
      <div>
        <form>
          <fieldset>
            <label htmlFor="order">order</label>
            <Field
              name="order"
              type="text"
              component="select"
              onChange={this.handleOrderChange}
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
    initialValues: { order: localStorage.getItem("order") },
    userName: state.scanner.userName,
    orderNumber: state.scanner.pickedOrder,
    orderDetails: state.scanner.orderDetails,
    enableReinitialize: true,
    menu: state.scanner.menu,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "orderPicker" })
)(OrderPicker);
