import Pattern from "../../assets/images/pattern.png";
import Ferdowsi from "../../assets/images/ferdowsi-retro.png";

export default function HeaderImage() {
  return (
    <div className="header-image">
      <div className="rotated-box">
        <span aria-hidden className="animated-letters" />
        <img draggable={false} className="main-image" src={Ferdowsi} alt="" />
      </div>
    </div>
  );
}
