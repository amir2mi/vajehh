import clsx from "clsx";
import { Route, Routes } from "react-router-dom";
import { useTheme, getNightModeClass } from "./contexts/theme";
import SearchMain from "./layouts/SearchMain";
import Navigation from "./components/Navigation";

function Vajehh() {
  const { nightMode } = useTheme();

  return (
    <div className={clsx("app", getNightModeClass(nightMode))}>
      <Navigation />
      <Routes>
        <Route path="/search/*" element={<SearchMain />} />
      </Routes>
    </div>
  );
}

export default Vajehh;
