import { useState, useEffect, FormEvent, MouseEvent, useCallback, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Input } from "react-flatifycss";
import clsx from "clsx";
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
  const [searchParams] = useSearchParams();
  const { autoSearch } = useSettings();

  // shared value
  const { searchValue, setSearchValue } = useSearch();
  // local value: can be initialised with word from url
  const [value, setValue] = useState(word || "");

  // wait until the user stops typing before updating the search value
  const debouncedValue = useDebounce(value, config.searchDebounceDuration);

  const searchInputElement = useRef<HTMLInputElement | null>(null);

  // replace / with space and trim the value
  const sanitizeValue = (value: string) => {
    return value.replace(/\//g, " ").trim();
  };

  const handleNaviagate = useCallback(
    (url: string) => {
      const activeTab = searchParams.get("tab");
      if (activeTab) {
        url = url + `?tab=${activeTab}`;
      }

      navigate(url);
    },
    [navigate, searchParams]
  );

  const getSearchValue = () => {
    // get current path and remove /search/ and return the decoded the value
    return decodeURIComponent(window.location.pathname).replace("/search/", "");
  };

  const setInputValue = useCallback(
    (value: string) => {
      // update local value, context value and URL
      const sanitizedValue = sanitizeValue(value);

      setValue(sanitizedValue);
      setSearchValue(sanitizedValue);
      handleNaviagate(sanitizedValue);
    },
    [handleNaviagate, setSearchValue]
  );

  const handleOnSubmit = (e: MouseEvent | FormEvent) => {
    e.preventDefault();
    // immediately update the search value and URL
    setInputValue(value);
  };

  const handleOnClear = () => {
    setInputValue("");
    searchInputElement?.current && searchInputElement.current.focus();
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

  const handlePageTitle = () => {
    const activeTab = searchParams.get("tab");

    if (activeTab && value) {
      switch (activeTab) {
        case "dehkhoda":
          document.title = `واژه | معنی و تفسیر ${value} در لغت نامه دهخدا`;
          break;
        case "teyfi":
          document.title = `واژه | واژگان مشابه با ${value} در فرهنگ طیفی`;
          break;
        case "motaradef":
          document.title = `واژه | مترادف و متضاد ${value}`;
          break;
        case "sereh":
          document.title = `واژه | معادل فارسی ${value} در فرهنگ سره`;
          break;
        case "farhangestan":
          document.title = `واژه | معادل تخصصی فارسی ${value} در فرهنگستان`;
          break;
        case "ganjvar":
          document.title = `واژه | اشعار و ابیات مرتبط با ${value}`;
          break;
      }
    } else {
      if (value) {
        document.title = `واژه | نتایج جستجو برای ${value}`;
      } else {
        document.title = `واژه | جستجوی واژه و اشعار در فرهنگ های سره، طیفی، گنجور و غیره`;
      }
    }
  };

  // if the user selected a word by double click, update the search value
  const onMultipleClicks = useCallback(
    function (e: any) {
      if (e.detail > 1) {
        var word = window.getSelection()?.toString();
        if (word && word.length > 2) {
          setInputValue(word);
        }
      }
    },
    [setInputValue]
  );

  const onGlobalKeyDown = (e: KeyboardEvent) => {
    // Accessiblity keyboard navigation: focus search input when "/" is pressed
    const input = searchInputElement?.current;
    if ((e.key === "/" || e.code === "Slash") && document.activeElement !== input) {
      input?.focus();
      e.preventDefault();
    }
  };

  // update value after URL change with the back and forward buttons
  useEffect(() => {
    const oldHashState = window.location.hash;
    const oldValue = getSearchValue();
    const onPopState = () => handleOnPopState(oldValue, oldHashState);

    window.addEventListener("popstate", onPopState);
    window.addEventListener("click", onMultipleClicks);
    window.addEventListener("keydown", onGlobalKeyDown);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("click", onMultipleClicks);
      window.removeEventListener("keydown", onGlobalKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // updated context value and URL after debounce
  useEffect(() => {
    // set debounced value after delay if autoSearch is active
    if (!autoSearch) return;
    // do not update value if it is the same as the current value
    if (debouncedValue === searchValue) return;
    const sanitizedValue = sanitizeValue(debouncedValue);

    setSearchValue(sanitizedValue);
    handleNaviagate(sanitizedValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    // change page title based on the search value and active tab
    handlePageTitle();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <>
      <form id="main-search-bar" aria-label="جستجو و تنظیمات جستجو" onSubmit={(e) => handleOnSubmit(e)}>
        <Input
          ref={searchInputElement}
          autoFocus
          autoComplete="off"
          name="search"
          type="text"
          wrapperClassName={clsx("search-bar", value && "has-value")}
          placeholder="جستجو"
          value={value}
          onChange={setValue}
        >
          <button type="reset" className="close-button" aria-label="پاکسازی جستجو" onClick={handleOnClear} />
          <button type="submit" className="search-button" aria-label="جستجو کن" />
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
