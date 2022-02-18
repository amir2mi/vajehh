import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import MasonryGrid from "./MasonryGrid";
import { Loading } from "react-flatifycss";
import { useSearch } from "../../contexts/search";
import { useSettings } from "../../contexts/settings";
import { AllowedDictionaries } from "../../contexts/dictionary";
import { searchWord } from "../../services/api";
import DefinitionBox from "../DefinitionBox";
import FakeDefinitionBox from "../FakeDefinitionBox";
import NoResult from "./NoResult";

interface ResultProps {
  item: {
    title: string;
    definition: string[];
  };
}

interface TabBodyProps {
  children: React.ReactNode;
  dic: AllowedDictionaries;
  onFinish: (count: number) => void;
  onSearch: () => void;
  postsPerPage: number;
}

export default function TabBody({ children, dic, onFinish, onSearch, postsPerPage }: TabBodyProps) {
  const { searchValue } = useSearch();
  const { highlight, highlightColor } = useSettings();

  const [result, setResult] = useState<"firstTime" | ResultProps[]>("firstTime");
  const [displayQueue, setDisplayQueue] = useState<ResultProps[]>();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const addMoreToQueue = (page: number) => {
    if (Array.isArray(result)) {
      setDisplayQueue(result?.slice(0, page * postsPerPage));
    }
  };

  useEffect(() => {
    // should not search when searchValue is empty
    if (!searchValue) return;

    // set local state to indicate that search is in progress
    setIsSearching(true);

    // call on search, tab use this function to show loading
    onSearch();

    searchWord(dic, searchValue)
      .then((data) => {
        if (data?.items) {
          // update search result
          setResult(data.items);

          // allowed items to display after fetch
          setDisplayQueue(data.items.slice(0, postsPerPage));

          // update result count
          onFinish(data.items.length || 0);
        } else {
          // reset result and queue
          setResult([]);
          setDisplayQueue([]);

          // no result
          onFinish(0);
        }
      })
      .finally(() => {
        // change searching state to false to stop loading
        setIsSearching(false);
      });

    return () => {
      // reset result and queue
      setResult([]);
      setDisplayQueue([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (!displayQueue || displayQueue.length === 0) && !isSearching ? (
    result === "firstTime" ? (
      <>{children}</>
    ) : (
      <NoResult />
    )
  ) : (
    <InfiniteScroll
      key={0}
      pageStart={0}
      loadMore={addMoreToQueue}
      hasMore={result?.length !== displayQueue?.length}
      loader={<Loading className="infinite-scroll-loading" size="lg" />}
    >
      <MasonryGrid>
        {isSearching
          ? [...new Array(12)].map((item, index) => <FakeDefinitionBox key={index} />)
          : displayQueue?.map(({ item }, index) => {
              const itemIndex = String(item.definition).slice(0, 12) + String(item.title).slice(0, 12) + index;

              return (
                <DefinitionBox
                  key={itemIndex}
                  title={item.title}
                  definition={item.definition}
                  hasMultipleLine={dic === "ganjvar" || dic === "farhangestan"}
                  highlight={highlight && searchValue.split(" ")}
                  highlightColor={highlightColor}
                />
              );
            })}
      </MasonryGrid>
    </InfiniteScroll>
  );
}
