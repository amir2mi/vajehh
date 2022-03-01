import { NavLink } from "react-router-dom";

interface NavLinkProps {
  title: string | React.ReactNode;
  to: string;
  openInNewTab?: boolean;
}

interface NavLinksProps {
  items: NavLinkProps[];
}

export default function NavLinks({ items }: NavLinksProps) {
  return (
    <>
      {items.map((item, index) => (
        <li key={index}>
          {item.openInNewTab ? (
            <a href={item.to} className="nav-link" target="_blank" rel="noreferrer">
              {item.title}
            </a>
          ) : (
            <NavLink to={item.to} className="nav-link">
              {item.title}
            </NavLink>
          )}
        </li>
      ))}
    </>
  );
}
