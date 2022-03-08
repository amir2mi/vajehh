import clsx from "clsx";
import { Route, Routes } from "react-router-dom";
import { useTheme, getNightModeClass } from "./contexts/theme";
import SearchPage from "./pages/search";
import HomePage from "./pages/home";
import Navigation from "./layouts/Navigation";
import Footer from "./layouts/Footer";

function Vajehh() {
  const { nightMode } = useTheme();

  return (
    <div className={clsx("app", "main-container", getNightModeClass(nightMode))}>
      <Navigation />
      <Routes>
        <Route path="/search/*" element={<SearchPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Vajehh;
