import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * [1] Scroll to top when route changes
 * [2] Add [home] class to body if the current route is home
 */

export default function OnRouteChange({ children }) {
  const location = useLocation();

  useEffect(() => {
    // [1]
    window.scrollTo(0, 0);

    // [2]
    if (location.pathname === "/") {
      document.body.classList.add("home");
    } else {
      document.body.classList.remove("home");
    }
  }, [location]);

  return <>{children}</>;
}
