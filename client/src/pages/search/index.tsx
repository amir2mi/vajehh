import { SearchProvider } from "../../contexts/search";
import { SettingsProvider } from "../../contexts/settings";
import { DictionaryProvider } from "../../contexts/dictionary";
import { PoetsProvider } from "../../contexts/poets";
import SearchArea from "../../layouts/SearchArea";
import ResultTabs from "../../layouts/ResultTabs";
import ResultImage from "../../layouts/ResultImage";
import { ShareBox } from "../../components";

export default function SearchPage() {
  return (
    <main className="search-main container-lg">
      <SettingsProvider>
        <SearchProvider>
          <DictionaryProvider>
            <PoetsProvider>
              <SearchArea />
              <ResultTabs />
              <ResultImage />
            </PoetsProvider>
          </DictionaryProvider>
        </SearchProvider>
        <ShareBox />
      </SettingsProvider>
    </main>
  );
}
