import { useEffect, useState } from "react";
import DefinitionBox from "../DefinitionBox";
import { useSearch } from "../../contexts/search";
import { useSettings } from "../../contexts/settings";
import { searchWord } from "../../services/api";
import MasonryGrid from "./MasonryGrid";

interface ResultProps {
  item: {
    title: string;
    definition: string[];
  };
}

export default function TabBody({ dic }) {
  const { searchValue } = useSearch();
  const { highlight, highlightColor } = useSettings();

  const [result, setResult] = useState<ResultProps[]>();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    setIsSearching(true);
    searchWord(dic, searchValue)
      .then((data) => {
        // update search result
        setResult(data.items);
      })
      .finally(() => {
        // change searching state to false to stop loading
        setIsSearching(false);
      });

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <MasonryGrid>
      {isSearching && "در حال جستجو"}
      {result &&
        result.map(({ item }, index) => {
          const itemIndex = String(item.definition).slice(0, 12) + String(item.title).slice(0, 12) + index;

          return (
            <DefinitionBox
              key={itemIndex}
              title={item.title}
              hasMultipleLine={true}
              definition={item.definition}
              separator={dic === "motaradef" || dic === "sereh" || dic === "teyfi" ? "، " : "\n"}
              highlight={highlight && searchValue.split(" ")}
              highlightColor={highlightColor}
            />
          );
        })}
    </MasonryGrid>
  );
}
