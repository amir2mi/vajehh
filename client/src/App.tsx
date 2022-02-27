import { Route, Routes } from "react-router-dom";  
import SearchMain from "./layouts/SearchMain";
import Navigation from "./components/Navigation";

function Vajehh() {
  return (
    <div className="app">
      <Navigation/>
      <Routes>
        <Route path="/search/*" element={<SearchMain />} />
      </Routes>
    </div>
  );
}

export default Vajehh;
