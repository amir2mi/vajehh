import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import MasonryGrid from "./MasonryGrid";
import { Loading } from "react-flatifycss";
import config from "@config.json";
import { useSearch } from "@contexts/search";
import { useSettings } from "@contexts/settings";
import type { AllowedDictionaries } from "@contexts/dictionary";
import { cacheToLocalStorage } from "@utils/localStorage";
import { searchWord } from "@services/api";
import { DefinitionBox, FakeDefinitionBox } from "@components";
import { DefinitionImagesProps } from "@components/DefinitionBox";
import IdleTab from "./IdleTab";

interface ResultProps {
  id: string;
  title: string;
  definition: string[];
  images: DefinitionImagesProps[];
  voice?: string;
}

interface SearchResponseProps {
  kind: string;
  items: ResultProps[];
}

interface TabBodyProps {
  children: React.ReactNode;
  dict: AllowedDictionaries;
  onFinish: (count: number) => void;
  onSearch: () => void;
  postsPerPage: number;
}

export default function TabBody({ children, dict, onFinish, onSearch, postsPerPage }: TabBodyProps) {
  const { searchValue } = useSearch();
  const { highlight, highlightColor, fuzzySearch, columnsCount, limitHeight, imageSearch } = useSettings();

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
      const response = await searchWord(dict, searchValue, fuzzySearch);
      const { items } = response?.data as SearchResponseProps;

      // update search result
      setResult(items);
      // allowed items to display after fetch
      setDisplayQueue(items?.slice(0, postsPerPage));
      // there was no error
      setHasError(false);
      // update result count
      onFinish(items?.length || 0);

      // cache the result to local storage
      // update current dictionary local storage cache
      cacheToLocalStorage(`cached_${dict}`, searchValue, items, config[`localCacheLimit__${dict}`]);
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
    // should not search when searchValue is empty or has less than 3 characters
    // also reset results
    if (searchValue.trim().length < 2) {
      setResult([]);
      setDisplayQueue([]);
      onFinish(0);
      return;
    }

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
  }, [searchValue, fuzzySearch]);

  const isIdle = !isSearching && (!displayQueue || displayQueue?.length === 0);

  return isIdle ? (
    <IdleTab hasError={hasError}>{children}</IdleTab>
  ) : (
    <InfiniteScroll
      pageStart={0}
      loadMore={addMoreToQueue}
      hasMore={result?.length !== displayQueue?.length}
      loader={<Loading key={0} className="infinite-scroll-loading" size="lg" />}
    >
      <MasonryGrid>
        {isSearching
          ? [...new Array(columnsCount * 2)].map((item, index) => <FakeDefinitionBox key={index} />)
          : displayQueue?.map((item, index) => {
              const itemIndex = String(item.definition).slice(0, 12) + String(item.title).slice(0, 12) + index;

              return (
                <DefinitionBox
                  key={itemIndex}
                  dictionary={dict}
                  title={item.title}
                  definition={item.definition}
                  images={item.images}
                  voice={item.voice}
                  showPoetAvatar={dict === "ganjvar"}
                  limit={limitHeight && (dict === "ganjvar" || dict === "dehkhoda") && 10}
                  hasMultipleLine={dict === "ganjvar" || dict === "farhangestan" || dict === "dehkhoda"}
                  highlight={highlight && searchValue.split(/&|،|,|\*|\+| /)}
                  highlightColor={highlightColor}
                />
              );
            })}
      </MasonryGrid>
    </InfiniteScroll>
  );
}
