import { NavLink } from "react-router-dom";
import { Dropdown } from "react-flatifycss";
import Icons from "../Icons";
import NightModeButton from "../NightModeButton";
import NavLinks from "../NavLinks";
import "./style.scss";

const navLinks = [
  {
    title: "جستجو",
    to: "/search",
  },
  {
    title: "راهنما",
    to: "/help",
  },
  {
    title: "حمایت مالی",
    to: "/donate",
  },
  {
    title: "پشتیبانی",
    to: "/support",
  },
  {
    title: (
      <>
        مشارکت در پروژه
        <Icons.External className="nav-icon" />
      </>
    ),
    openInNewTab: true,
    to: "https://github.com/amir2mi/vajehh",
  },
];

export default function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="" className="home-link">
        واژه
      </NavLink>
      <ul className="navigation-links desktop">
        <NavLinks items={navLinks} />
      </ul>
      <div className="navigation-buttons">
        <Dropdown
          id="mobile-navigation-dropdown"
          className="mobile-navigation-dropdown"
          autoClose={true}
          size="xs"
          buttonLabel={<Icons.More />}
          offsetY={10}
        >
          <ul className="navigation-links mobile">
            <NavLinks items={navLinks} />
          </ul>
        </Dropdown>
        <NightModeButton />
      </div>
    </nav>
  );
}
