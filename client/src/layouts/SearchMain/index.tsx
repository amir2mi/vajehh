import { SearchProvider } from "../../contexts/search";
import { SettingsProvider } from "../../contexts/settings";
import { DictionaryProvider } from "../../contexts/dictionary";
import Title from "../../components/Title";
import SearchArea from "../../components/SearchArea";
import ResultTabs from "../../components/ResultTabs";

export default function SearchMain() {
  return (
    <main className="search-main container-lg">
      <Title id="app-title" title="واژه" subtitle="زیبا و خلاق بنویسید" />
      <SettingsProvider>
        <SearchProvider>
          <DictionaryProvider>
            <SearchArea />
            <ResultTabs />
          </DictionaryProvider>
        </SearchProvider>
      </SettingsProvider>
    </main>
  );
}
