import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  MenuDataType,
  IPickOrder,
  IGetOrder,
  IOccupyLineWithOrder,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import { renderTime } from "../../../utils/renderTime";
import OrderIcon from "../../icons/OrderIcon";
import "./OrderPickerStyle.scss";

interface IOrderPickerProps {
  initialValues: {
    order: string | null;
  };
  userName: string;
  _line: string | null;
  orderNumber: string | null;
  isPaused: boolean;
  menu: MenuDataType;
  readerInputState: {
    isDisabled: boolean;
  };
  getMenu: () => void;
  pickOrder: ({ orderNumber }: IPickOrder) => void;
  getOrder: ({ orderNumber }: IGetOrder) => void;
  occupyLineWithOrder: ({ _line, orderNumber }: IOccupyLineWithOrder) => void;
}

interface IFormProps extends React.ChangeEvent<HTMLInputElement> {
  order: string;
}

class OrderPicker extends Component<
  InjectedFormProps<IFormProps> & IOrderPickerProps
> {
  componentDidMount() {
    this.props.getMenu();
  }

  handleOrderChange = (formProps: IFormProps) => {
    const orderNumber = formProps.target.value;
    const { _line, pickOrder, getOrder, occupyLineWithOrder } = this.props;
    pickOrder({ orderNumber });
    getOrder({ orderNumber });
    occupyLineWithOrder({ _line, orderNumber });
  };

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

function mapStateToProps(state: StoreState) {
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
)(OrderPicker) as ElementType;
