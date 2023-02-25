import { Button } from "react-flatifycss";
import DaftPunk from "@assets/images/daft-punk-retro.png";
import { shareVajehh } from "@utils/share";
import { Icons, Info, RotatedBox } from "..";
import "./style.scss";

export default function ShareBox() {
  return (
    <RotatedBox rotateContent className="share-box">
      <Info
        title={
          <>
            اشتراک‌‌گذاری
            <div className="share-buttons">
              <Button onClick={shareVajehh}>{!!navigator.share ? <Icons.Share /> : <Icons.Twitter />}</Button>
            </div>
          </>
        }
        subtitle="به دوستان و آشنایان در مورد واژه خبر دهید!"
      />
      <img className="share-image" src={DaftPunk} alt="اشتراک‌گذاری واژه" draggable={false} />
      <span className="halftone" />
    </RotatedBox>
  );
}
