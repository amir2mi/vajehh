import { NavLink } from "react-router-dom";
import { Dropdown } from "react-flatifycss";
import config from "../../config.json";
import { Icons, NavLinks, NightModeButton } from "../../components";
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
    title: "پشتیبانی",
    to: "/support",
  },
  {
    title: (
      <>
        حمایت مالی
        <Icons.External className="nav-icon" />
      </>
    ),
    openInNewTab: true,
    to: config.supportURL,
  },
  {
    title: (
      <>
        مشارکت در پروژه
        <Icons.External className="nav-icon" />
      </>
    ),
    openInNewTab: true,
    to: config.githubURL,
  },
];

export default function Navigation() {
  return (
    <nav className="navigation main-container">
      <NavLink to="" className="home-link overlay-layer">
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
