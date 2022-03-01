import clsx from "clsx";
import { Route, Routes } from "react-router-dom";
import { useTheme, getNightModeClass } from "./contexts/theme";
import SearchPage from "./pages/search";
import HomePage from "./pages/home";
import Navigation from "./components/Navigation";

function Vajehh() {
  const { nightMode } = useTheme();

  return (
    <div className={clsx("app",'main-container', getNightModeClass(nightMode))}>
      <Navigation />
      <Routes>
        <Route path="/search/*" element={<SearchPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default Vajehh;
