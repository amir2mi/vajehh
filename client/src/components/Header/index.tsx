import HeaderInfo from "./HeaderInfo";
import HeaderImage from "./HeaderImage";
import "./style.scss";

export default function Header() {
  return (
    <header className="header">
      <HeaderInfo />
      <HeaderImage />
    </header>
  );
}
