import React, { Component } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { by } from "../../utils/by";
import * as actions from "../../actions";
import {
  ProductType,
  MenuDataType,
  LineType,
  SetMessageAction,
} from "../../actions";
import { StoreState } from "../../reducers";
import requireAuth from "../requireAuth";

interface IFormProps extends React.ChangeEvent<HTMLInputElement> {
  lineDescription: string;
}

interface ILineProductChooserProps {
  errorMessage: string;
  products: ProductType[];
  productId: string;
  lines: LineType[];
  isLoading: boolean;
  menu: MenuDataType;
  productDetails: ProductType;
  getProduct: (productId?: string) => void;
  setMessage: (message: string) => SetMessageAction;
  getLines: () => void;
}

class LineProductChooser extends Component<
  InjectedFormProps<IFormProps> & ILineProductChooserProps
> {
  async componentDidMount() {
    await this.props.getLines();
  }

  getZkFromLine(line: string) {
    const filteredLines = this.props.lines.filter(
      (l) => l.lineDescription === line
    );
    return filteredLines.length ? filteredLines[0].lineOccupiedWith : null;
  }

  getPartNumberFromZk(zk: string | null) {
    const {
      menu: { menuContent },
    } = this.props;
    const orders = menuContent.filter((order) => order.orderNumber === zk);
    return orders.length ? orders[0].partNumber : null;
  }

  getIdForPartNumber(partNumber: string | null) {
    const filteredProducts = this.props.products.filter(
      (product) => product.partNumber === partNumber
    );
    return filteredProducts.length ? filteredProducts[0]._id : null;
  }

  handleChange = (formProps: IFormProps) => {
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

function mapStateToProps(state: StoreState) {
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
  reduxForm({ form: "lineProductChooser" })
)(requireAuth(LineProductChooser));
