import React, { useEffect, useState } from "react";
import { Button, ToggleSwitch } from "react-flatifycss";
import config from "@config.json";
import { useDictionary } from "@contexts/dictionary";
import { useSearch } from "@contexts/search";
import { useSettings } from "@contexts/settings";
import { searchWord } from "@services/api";
import { cacheToLocalStorage, setLocalStorage, setLocalStorageProp } from "@utils/localStorage";
import "./style.scss";

interface SearchInfoProps {
  disableSuggestion?: boolean;
  onSuggestionClick?: (suggestion: string) => void;
}

export default function SearchInfo({ disableSuggestion, onSuggestionClick }: SearchInfoProps) {
  const { fuzzySearch, setFuzzySearch } = useSettings();
  const { searchValue } = useSearch();
  const { dictionaries } = useDictionary();

  const [result, setResult] = useState<string[]>();

  const search = async () => {
    if (disableSuggestion || !dictionaries.emlaei.active) return;

    try {
      const response = await searchWord("emlaei", searchValue);
      const { items } = response?.data;
      setResult(items || []);

      // cache the result to local storage
      // update current dictionary local storage cache
      cacheToLocalStorage("cached_emlaei", searchValue, items, config["localCacheLimit__emlaei"]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFuzzySearchToggle = (value: boolean) => {
    setFuzzySearch(value);
    setLocalStorageProp("settings", "fuzzySearch", value);

    // reset cached results on fuzzy search toggle
    setLocalStorage("cached_dehkhoda", {});
    setLocalStorage("cached_teyfi", {});
    setLocalStorage("cached_motaradef", {});
    setLocalStorage("cached_sereh", {});
    setLocalStorage("cached_farhangestan", {});
    setLocalStorage("cached_ganjvar", {});
  };

  useEffect(() => {
    // should not search when searchValue is empty or has less than 3 characters
    // also reset results
    if (searchValue.trim().length < 2) {
      setResult([]);
      return;
    }

    search();

    return () => {
      // reset result and queue
      setResult([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className="search-info size-sm opacity-70">
      {dictionaries.emlaei?.active && result && result.length > 0 ? (
        <div className="anim-fade-in">
          منظورتان{" "}
          {result.map((item, index) => (
            <React.Fragment key={index}>
              <Button
                className="suggestion-button"
                theme="purple-light"
                size="xs"
                onClick={() => onSuggestionClick?.(item)}
              >
                {item}
              </Button>
              {result.length - 1 !== index && " یا "}
            </React.Fragment>
          ))}{" "}
          بود؟
        </div>
      ) : (
        searchValue.length !== 1 && (
          <ToggleSwitch
            className="anim-fade-in"
            checked={fuzzySearch}
            onChange={(e, value) => handleFuzzySearchToggle(value)}
          >
            کشف واژگان مشابه
          </ToggleSwitch>
        )
      )}
      {searchValue.length === 1 && <span className="anim-fade-in">متن جستجو باید بیشتر از یک حرف باشد</span>}
    </div>
  );
}
