import LinePicker from "./LinePicker";
import EfficiencyCard from "./EfficiencyCard";
import "./MiddleStyle.scss";

const Middle = () => (
  <div className="middle">
    <LinePicker />
    <EfficiencyCard />
    <EfficiencyCard />
  </div>
);

export default Middle;
