import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "react-flatifycss";
import config from "../../config.json";
import useDebounce from "../../hooks/useDebounce";
import { useSettings } from "../../contexts/settings";
import { useSearch } from "../../contexts/search";
import SearchInfo from "../SearchInfo";
import DictionaryPicker from "../DictionaryPicker";
import SearchSettings from "../SearchSettings";
import "./style.scss";

interface SearchAreaProps {
  disableSuggestion?: boolean;
}

export default function SearchArea({ disableSuggestion }: SearchAreaProps) {
  const navigate = useNavigate();
  const { "*": word } = useParams();
  const { autoSearch } = useSettings();

  // shared value
  const { searchValue, setSearchValue } = useSearch();
  // local value: can be initialised with word from url
  const [value, setValue] = useState(word || "");

  // wait until the user stops typing before updating the search value
  const debouncedValue = useDebounce(value, config.searchDebounceDuration);

  // replace / with space and trim the value
  const sanitizeValue = (value: string) => {
    return value.replace(/\//g, " ").trim();
  };

  const getSearchValue = () => {
    // get current path and remove /search/ and return the decoded the value
    return decodeURIComponent(window.location.pathname).replace("/search/", "");
  };

  const setInputValue = (value: string) => {
    // update local value, context value and URL
    const sanitizedValue = sanitizeValue(value);

    setValue(sanitizedValue);
    setSearchValue(sanitizedValue);
    navigate(sanitizedValue);
  };

  const handleOnSubmit = (e: MouseEvent | FormEvent) => {
    e.preventDefault();
    const sanitizedValue = sanitizeValue(value);

    // immediately update the search value and URL
    setSearchValue(sanitizedValue);
    navigate(sanitizedValue);
  };

  const handleOnPopState = (oldValue, oldHashState) => {
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
  };

  useEffect(() => {
    if (searchValue) {
      document.title = `واژه | مترادف و اشعار مرتبط با ${searchValue}`;
    } else {
      document.title = `واژه | جستجوی واژه و اشعار در فرهنگ های سره، طیفی، گنجور و غیره`;
    }
  }, [searchValue]);

  // updated context value and URL after debounce
  useEffect(() => {
    // set debounced value after delay if autoSearch is active
    if (!autoSearch) return;

    // do not update value if it is the same as the current value
    if (debouncedValue === searchValue) return;

    const sanitizedValue = sanitizeValue(debouncedValue);

    setSearchValue(sanitizedValue);
    navigate(sanitizedValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  // update value after URL change with the back and forward buttons
  useEffect(() => {
    const oldHashState = window.location.hash;
    const oldValue = getSearchValue();
    const onPopState = () => handleOnPopState(oldValue, oldHashState);

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form id="main-search-bar" aria-label="جستجو و تنظیمات جستجو" onSubmit={(e) => handleOnSubmit(e)}>
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
        <SearchInfo disableSuggestion={disableSuggestion} onSuggestionClick={(word) => setInputValue(word)} />
        <div className="search-settings-left">
          <DictionaryPicker />
          <SearchSettings />
        </div>
      </div>
    </>
  );
}
