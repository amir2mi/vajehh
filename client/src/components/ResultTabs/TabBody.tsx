import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import DefinitionBox from "../DefinitionBox";
import { AllowedDictionaries, useSearch } from "../../contexts/search";
import { useSettings } from "../../contexts/settings";
import { searchWord } from "../../services/api";
import MasonryGrid from "./MasonryGrid";

interface ResultProps {
  item: {
    title: string;
    definition: string[];
  };
}

interface TabBodyProps {
  dic: AllowedDictionaries;
  postsPerPage: number;
}

export default function TabBody({ dic, postsPerPage }: TabBodyProps) {
  const { searchValue } = useSearch();
  const { highlight, highlightColor } = useSettings();

  const [result, setResult] = useState<ResultProps[]>();
  const [displayQueue, setDisplayQueue] = useState<ResultProps[]>();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const loadFunc = (page: number) => {
    setDisplayQueue(result?.slice(0, page * postsPerPage));
  };

  useEffect(() => {
    // should not search when searchValue is empty
    if (!searchValue) return;

    setIsSearching(true);
    searchWord(dic, searchValue)
      .then((data) => {
        // update search result
        setResult(data.items);
        // allowed items to display after fetch
        setDisplayQueue(data.items.slice(0, postsPerPage));
      })
      .finally(() => {
        // change searching state to false to stop loading
        setIsSearching(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadFunc}
      hasMore={result?.length !== displayQueue?.length}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      <MasonryGrid>
        {isSearching && "در حال جستجو"}
        {displayQueue
          ? displayQueue.map(({ item }, index) => {
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
            })
          : "test"}
      </MasonryGrid>
    </InfiniteScroll>
  );
}
