import DaftPunk from "../../assets/images/daft-punk-retro.png";
import RotatedBox from "../RotatedBox";
import Info from "../Info";
import "./style.scss";

export default function ShareBox() {
  return (
    <RotatedBox rotateContent className="share-box">
      <Info title="اشتراک گذاری" subtitle="به دوستان و آشنایان در مورد واژه بگویید!" />
      <img className="share-image" src={DaftPunk} alt="اشتراک‌گذاری واژه"  draggable={false}/>
    </RotatedBox>
  );
}
