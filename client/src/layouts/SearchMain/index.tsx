import React from "react";
import { SearchProvider } from "../../contexts/search";
import SearchArea from "../../components/SearchArea";

export default function SearchMain() {
  return (
    <SearchProvider>
      <main className="search-main container-lg">
        <SearchArea />
      </main>
    </SearchProvider>
  );
}
