import { useEffect } from "react";
import HeaderInfo from "./HeaderInfo";
import HeaderImage from "./HeaderImage";
import "./style.scss";

export default function Header() {
  useEffect(() => {
    document.title = "واژه | موتور جستجوی نویسندگان";
  }, []);

  return (
    <header className="header">
      <HeaderInfo />
      <HeaderImage />
    </header>
  );
}
