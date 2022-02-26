import { Route, Routes } from "react-router-dom";
import SearchMain from "./layouts/SearchMain";

function Vajehh() {
  return (
    <div className="app">
      <Routes>
        <Route path="/search/*" element={<SearchMain />} />
      </Routes>
    </div>
  );
}

export default Vajehh;
