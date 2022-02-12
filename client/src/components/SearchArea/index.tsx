import { useState, useEffect } from "react";
import { Input } from "react-flatifycss";
import config from "../../config.json";
import useDebounce from "../../hooks/useDebounce";
import { useSearch } from "../../contexts/search";
import SearchInfo from "../../components/SearchInfo";
import DictionaryPicker from "../../components/DictionaryPicker";
import SearchSettings from "../SearchSettings";
import "./style.scss";

export default function SearchArea() {
  const { setSearchValue } = useSearch();
  const [value, setValue] = useState("");
  // wait until the user stops typing before updating the search value
  const debouncedValue = useDebounce(value, config.searchDebounceDuration);

  useEffect(() => {
    setSearchValue(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <>
      <div id="main-search-bar">
        <Input
          autoFocus
          name="search"
          type="text"
          wrapperClassName="search-bar"
          placeholder="جستجو"
          value={value}
          theme="light"
          onChange={(val) => setValue(val)}
        >
          <button className="search-button" aria-label="جستجو کن"></button>
        </Input>
      </div>
      <div className="search-settings">
        <SearchInfo />
        <div className="search-settings-left">
          <DictionaryPicker />
          <SearchSettings />
        </div>
      </div>
    </>
  );
}
