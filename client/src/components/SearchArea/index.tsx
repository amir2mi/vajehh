import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "react-flatifycss";
import config from "../../config.json";
import useDebounce from "../../hooks/useDebounce";
import { useSettings } from "../../contexts/settings";
import { useSearch } from "../../contexts/search";
import SearchInfo from "../../components/SearchInfo";
import DictionaryPicker from "../../components/DictionaryPicker";
import SearchSettings from "../SearchSettings";
import "./style.scss";

export default function SearchArea() {
  const navigate = useNavigate();
  const { "*": word } = useParams();
  const { autoSearch } = useSettings();

  // shared value
  const { setSearchValue } = useSearch();
  // local value: can be initialised with word from url
  const [value, setValue] = useState(word || "");

  // wait until the user stops typing before updating the search value
  const debouncedValue = useDebounce(value, config.searchDebounceDuration);

  const getSearchValue = () => {
    // get current path and remove /search/ and return the decoded the value
    return decodeURIComponent(window.location.pathname).replace("/search/", "");
  };

  const setInputValue = (value: string) => {
    // update local value, context value and URL
    setValue(value);
    setSearchValue(value);
    navigate(value);
  };

  const handleOnSubmit = (e: MouseEvent | FormEvent) => {
    e.preventDefault();

    // immediately update the search value and URL
    setSearchValue(value);
    navigate(value);
  };

  // updated context value and URL after debounce
  useEffect(() => {
    // set debounced value after delay if autoSearch is active
    if (!autoSearch) return;

    setSearchValue(debouncedValue);
    navigate(value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  // update value after URL change with the back and forward buttons
  useEffect(() => {
    const oldHashState = window.location.hash;
    const oldValue = getSearchValue();

    window.addEventListener("popstate", () => {
      const newHashState = window.location.hash;
      const newValue = getSearchValue();

      // Do not continue if the given search value is empty
      if (newValue === "/search") return;

      // Do NOT update the value when hash changes,
      // this is to prevent the search area from updating when the user clicks on a link.
      if (oldValue === newValue && oldHashState !== newHashState) return;

      // update local and context value
      setValue(newValue);
      setSearchValue(newValue);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form id="main-search-bar" onSubmit={(e) => handleOnSubmit(e)}>
        <Input
          autoFocus
          name="search"
          type="text"
          wrapperClassName="search-bar"
          placeholder="جستجو"
          value={value}
          onChange={(val) => setValue(val)}
        >
          <button className="search-button" aria-label="جستجو کن" onClick={(e) => handleOnSubmit(e)}></button>
        </Input>
      </form>
      <div className="search-settings">
        <SearchInfo onSuggestionClick={(word) => setInputValue(word)} />
        <div className="search-settings-left">
          <DictionaryPicker />
          <SearchSettings />
        </div>
      </div>
    </>
  );
}
