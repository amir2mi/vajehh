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
import Error from "./Error";
import NoResult from "./NoResult";

interface ResultProps {
  id: string;
  title: string;
  definition: string[];
}

interface SearchResponseProps {
  kind: string;
  items: ResultProps[];
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

  const [result, setResult] = useState<ResultProps[]>();
  const [displayQueue, setDisplayQueue] = useState<ResultProps[]>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const addMoreToQueue = (page: number) => {
    if (Array.isArray(result)) {
      setDisplayQueue(result?.slice(0, page * postsPerPage));
    }
  };

  const search = async () => {
    try {
      const response = await searchWord(dic, searchValue);
      const { items } = response?.data as SearchResponseProps;

      // update search result
      setResult(items);
      // allowed items to display after fetch
      setDisplayQueue(items?.slice(0, postsPerPage));
      // update result count
      onFinish(items.length || 0);
      // there was no error
      setHasError(false);
    } catch (err) {
      console.error(err);
      setHasError(true);
      // there was an error so there is no result
      onFinish(0);
    } finally {
      // stop loading
      setIsSearching(false);
    }
  };

  useEffect(() => {
    // should not search when searchValue is empty
    if (!searchValue) return;

    // set local state to indicate that search is in progress
    setIsSearching(true);
    // call on search, tab use this function to show loading
    onSearch();
    // search and update result
    search();

    return () => {
      // reset result and queue
      setResult([]);
      setDisplayQueue([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return !isSearching && (!displayQueue || displayQueue?.length === 0) ? (
    searchValue?.length < 2 ? (
      <>{children}</>
    ) : hasError ? (
      <Error />
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
          : displayQueue?.map((item, index) => {
              const itemIndex = String(item.definition).slice(0, 12) + String(item.title).slice(0, 12) + index;

              return (
                <DefinitionBox
                  key={itemIndex}
                  title={item.title}
                  definition={item.definition}
                  hasMultipleLine={dic === "ganjvar" || dic === "farhangestan"}
                  highlight={highlight && searchValue.split(/&|،|,|\*|\+| /)}
                  highlightColor={highlightColor}
                />
              );
            })}
      </MasonryGrid>
    </InfiniteScroll>
  );
}
