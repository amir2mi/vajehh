import HeaderInfo from "./HeaderInfo";
import HeaderImage from "./HeaderImage";
import "./style.scss";

export default function Header() {
  return (
    <div className="header">
      <HeaderInfo />
      <HeaderImage />
    </div>
  );
}
