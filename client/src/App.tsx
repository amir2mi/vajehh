import clsx from "clsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastsWrapper } from "react-flatifycss";
import { useTheme, getNightModeClass } from "./contexts/theme";
import SearchPage from "./pages/search";
import HomePage from "./pages/home";
import HelpPage from "./pages/help";
import SupportPage from "./pages/support";
import DonatePage from "./pages/donate";
import NothingFound from "./pages/404";
import ChatPage from "./pages/chat";
import Navigation from "./layouts/Navigation";
import Footer from "./layouts/Footer";
import { OnRouteChange } from "./components";

function Vajehh() {
  const { nightMode } = useTheme();

  return (
    <div className={clsx("app", getNightModeClass(nightMode))}>
      <Navigation />
      <ToastsWrapper />
      <OnRouteChange>
        <Routes>
          <Route path="/search/*" element={<SearchPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/404" element={<NothingFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </OnRouteChange>
      <Footer />
    </div>
  );
}

export default Vajehh;
