import React, { useEffect, useState } from "react";
import { Button } from "react-flatifycss";
import { useSearch } from "../../contexts/search";
import { useDictionary } from "../../contexts/dictionary";
import { searchWord } from "../../services/api";
import "./style.scss";

interface SearchInfoProps {
  disableSuggestion?: boolean;
  onSuggestionClick?: (suggestion: string) => void;
}

export default function SearchInfo({ disableSuggestion, onSuggestionClick }: SearchInfoProps) {
  const { searchValue } = useSearch();
  const { dictionaries } = useDictionary();

  const [result, setResult] = useState<string[]>();

  const search = async () => {
    if (disableSuggestion) return;

    try {
      const response = await searchWord("emlaei", searchValue);
      const { items } = response?.data;
      setResult(items || []);
    } catch (err) {
      console.error(err);
    }
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
      ) : null}
      {searchValue.length === 1 && <span className="anim-fade-in">متن جستجو باید بیشتر از یک حرف باشد</span>}
    </div>
  );
}
