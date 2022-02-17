import React, { useEffect, useState } from "react";
import { Button } from "react-flatifycss";
import { useSearch } from "../../contexts/search";
import { useDictionary } from "../../contexts/dictionary";
import { searchWord } from "../../services/api";
import "./style.scss";

interface SearchInfoProps {
  onSuggestionClick?: (suggestion: string) => void;
}

export default function SearchInfo({ onSuggestionClick }: SearchInfoProps) {
  const { searchValue } = useSearch();
  const { dictionaries } = useDictionary();

  const [result, setResult] = useState<string[]>();

  useEffect(() => {
    // should not search when searchValue is empty
    if (!searchValue) return;

    searchWord("emlaei", searchValue).then((data) => {
      if (data?.items) {
        // update search result
        setResult(data.items);
      } else {
        // reset result and queue
        setResult([]);
      }
    });

    return () => {
      // reset result and queue
      setResult([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className="search-info size-sm opacity-70">
      {dictionaries.emlaei.active && result && result.length > 0 ? (
        <div className="anim-fade-in">
          منظورتان
          {result.map((item, index) => (
            <React.Fragment key={index}>
              <Button className="suggestion-button" theme="purple" size="xs" onClick={() => onSuggestionClick?.(item)}>
                {item}
              </Button>
              {index + 1 === result.length ? "" : "یا"}
            </React.Fragment>
          ))}
          بود؟
        </div>
      ) : null}
      {searchValue.length === 1 && <span className="anim-fade-in">متن جستجو باید بیشتر از یک حرف باشد</span>}
    </div>
  );
}
