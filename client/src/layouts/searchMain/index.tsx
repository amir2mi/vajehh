import React from "react";
import { SearchProvider } from "../../contexts/search";
import SearchBar from "../../components/search-bar";

export default function SearchMain() {
  return (
    <SearchProvider>
      <main className="search-main container-lg">
        <SearchBar />
      </main>
    </SearchProvider>
  );
}
