import OrderPicker from "./OrderPicker";
import OrderButtons from "./OrderButtons";
import MissingScans from "./MissingScans";
import DoneTodoCard from "./DoneTodoCard";
import "./RightStyle.scss";

const Right = () => (
  <div className="right-v3">
    <OrderPicker />
    <MissingScans />
    <DoneTodoCard />
    <OrderButtons />
  </div>
);

export default Right;
