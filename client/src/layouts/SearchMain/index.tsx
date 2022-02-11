import { SearchProvider } from "../../contexts/search";
import Title from "../../components/Title";
import SearchArea from "../../components/SearchArea";
import ResultTabs from "../../components/ResultTabs";

export default function SearchMain() {
  return (
    <SearchProvider>
      <main className="search-main container-lg">
        <Title title="واژه" subtitle="زیبا و خلاق بنویسید" />
        <SearchArea />
        <ResultTabs />
      </main>
    </SearchProvider>
  );
}
