import { SearchProvider } from "../../contexts/search";
import { LayoutProvider } from "../../contexts/layout";
import Title from "../../components/Title";
import SearchArea from "../../components/SearchArea";
import ResultTabs from "../../components/ResultTabs";

export default function SearchMain() {
  return (
    <main className="search-main container-lg">
      <Title title="واژه" subtitle="زیبا و خلاق بنویسید" />
      <LayoutProvider>
        <SearchProvider>
          <SearchArea />
          <ResultTabs />
        </SearchProvider>
      </LayoutProvider>
    </main>
  );
}
