import LinePicker from "./LinePicker";
import EfficiencyCard from "./EfficiencyCard";
import Game from "./Game";
import "./MiddleStyle.scss";

const Middle = () => (
  <div className="middle-v3">
    <LinePicker />
    <EfficiencyCard />
    <Game />
  </div>
);

export default Middle;
