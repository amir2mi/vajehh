import { Button } from "react-flatifycss";
import DaftPunk from "../../assets/images/daft-punk-retro.png";
import { Info, RotatedBox } from "..";
import "./style.scss";

export default function ShareBox() {
  return (
    <RotatedBox rotateContent className="share-box">
      <Info
        title={
          <>
            اشتراک‌‌گذاری
            <div className="share-buttons">
              <Button>Share</Button>
              <Button>Tweet</Button>
            </div>
          </>
        }
        subtitle="به دوستان و آشنایان در مورد واژه خبر دهید!"
      />
      <img className="share-image" src={DaftPunk} alt="اشتراک‌گذاری واژه" draggable={false} />
      <span className="halftone"></span>
    </RotatedBox>
  );
}
