import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { by } from "../../utils/by";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";

class LineProductChooser extends Component {
  async componentDidMount() {
    await this.props.getLines();
  }

  getZkFromLine(line) {
    const filteredLines = this.props.lines.filter(
      (l) => l.lineDescription === line
    );
    return filteredLines.length ? filteredLines[0].lineOccupiedWith : null;
  }

  getPartNumberFromZk(zk) {
    const {
      menu: { menuContent },
    } = this.props;
    const orders = menuContent.filter((order) => order.orderNumber === zk);
    return orders.length ? orders[0].partNumber : null;
  }

  getIdForPartNumber(partNumber) {
    const filteredProducts = this.props.products.filter(
      (product) => product.partNumber === partNumber
    );
    return filteredProducts.length ? filteredProducts[0]._id : null;
  }

  handleChange = (formProps) => {
    const { getProduct, setMessage, reset } = this.props;
    const line = formProps.target.value;
    const zk = this.getZkFromLine(line);
    const partNumber = this.getPartNumberFromZk(zk);
    const id = this.getIdForPartNumber(partNumber);

    if (!zk) {
      setMessage(`line ${line} is not occupied at this very moment`);
    } else if (!partNumber) {
      setMessage(`order ${zk} is not found`);
    } else if (!id) {
      setMessage(`product ${partNumber} is not defined yet`);
    } else if (id) {
      setMessage("");
      getProduct(id);
    }

    reset();
  };

  renderOptions() {
    const { lines } = this.props;
    if (lines) {
      return (
        <>
          {lines.sort(by("lineDescription")).map((line) => {
            const { lineDescription, _id } = line;
            return (
              <option
                key={_id}
                value={lineDescription}
                children={lineDescription}
              />
            );
          })}
        </>
      );
    }
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="">
        <form className="">
          <fieldset>
            <label
              className="product-chooser-form__label"
              htmlFor="lineDescription"
            >
              line
            </label>
            <Field
              name="lineDescription"
              type="text"
              component="select"
              className="product-chooser-form__select "
              value=""
              disabled={isLoading}
              onChange={this.handleChange}
              required
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

const validate = (values) => {
  const errors = {};

  if (!values.lineDescription) {
    errors.lineDescription = "Required";
  }

  return errors;
};

function mapStateToProps(state) {
  const {
    errorMessage,
    productId,
    productDetails,
    products,
    isLoading,
  } = state.wids;
  const { lines, menu } = state.scanner;
  return {
    errorMessage,
    productId,
    products,
    lines,
    isLoading,
    menu,
    productDetails,
    enableReinitialize: true,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "lineProductChooser", validate: validate })
)(requireAuth(LineProductChooser));
