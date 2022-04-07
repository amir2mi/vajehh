import { Firefly } from "../../components";
import "./style.scss";

export default function FooterFireflies() {
  return (
    <div aria-hidden className="footer-fireflies">
      <Firefly className="right" />
      <Firefly className="center" animated />
      <Firefly className="left" />
    </div>
  );
}
