import clsx from "clsx";
import { Route, Routes } from "react-router-dom";
import { useTheme, getNightModeClass } from "./contexts/theme";
import SearchPage from "./pages/search";
import HomePage from "./pages/home";
import HelpPage from "./pages/help";
import Navigation from "./layouts/Navigation";
import Footer from "./layouts/Footer";
import { ScrollToTop } from "./components";

function Vajehh() {
  const { nightMode } = useTheme();

  return (
    <div className={clsx("app", "main-container", getNightModeClass(nightMode))}>
      <Navigation />
      <ScrollToTop>
        <Routes>
          <Route path="/search/*" element={<SearchPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </ScrollToTop>
      <Footer />
    </div>
  );
}

export default Vajehh;
