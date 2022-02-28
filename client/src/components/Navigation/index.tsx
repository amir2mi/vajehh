import { NavLink } from "react-router-dom";
import NightModeButton from "../NightModeButton";
import "./style.scss";

export default function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="" className="home-link">
        واژه
      </NavLink>
      <ul className="navigation-links">
        <li>
          <NavLink to="/search" className="nav-link">
            جستجو
          </NavLink>
        </li>
        <li>
          <NavLink to="/help" className="nav-link">
            راهنما
          </NavLink>
        </li>
        <li>
          <NavLink to="/donate" className="nav-link">
            حمایت مالی
          </NavLink>
        </li>
        <li>
          <a href="https://github.com/amir2mi/vajehh" className="nav-link" target="_blank" rel="noreferrer">
            مشارکت در پروژه
          </a>
        </li>
        <li>
          <NavLink to="/support" className="nav-link">
            پشتیبانی
          </NavLink>
        </li>
      </ul>
      <NightModeButton />
    </nav>
  );
}
