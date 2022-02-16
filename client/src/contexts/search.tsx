import React, { createContext, useContext, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

interface SearchProviderProps {
  children: React.ReactNode;
}

interface DictionariesInfo {
  name: string;
  key: string;
  active: boolean;
}

export type AllowedDictionaries = "motaradef" | "sereh" | "teyfi" | "farhangestan" | "ganjvar";

export interface Dictionaries {
  [key: string]: DictionariesInfo;
  farhangestan: DictionariesInfo;
  ganjvar: DictionariesInfo;
  motaradef: DictionariesInfo;
  sereh: DictionariesInfo;
  teyfi: DictionariesInfo;
}

interface SearchContextProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  dictionaries: Dictionaries;
  setDictionaries: (value: Dictionaries) => void;
  editDictionary: (dic: string, prop: string, value: unknown) => void;
}

const getActiveDictionaries = () => {
  // check local storage

  // if empty set default dictionaries
  return {
    motaradef: {
      name: "مترادف",
      key: "motaradef",
      active: true,
    },
    sereh: {
      name: "سره",
      key: "sereh",
      active: true,
    },
    teyfi: {
      name: "طیفی",
      key: "teyfi",
      active: true,
    },
    farhangestan: {
      name: "فرهنگستان",
      key: "farhangestan",
      active: true,
    },
    ganjvar: {
      name: "گنجور",
      key: "ganjvar",
      active: true,
    },
  };
};

const SearchContext = createContext<undefined | SearchContextProps>(undefined);

const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  // use local storage to get selected dictionaries, if local storage is empty set default dictionaries
  const [dictionaries, setDictionaries] = useState<Dictionaries>(() =>
    getLocalStorage("dictionaries", getActiveDictionaries())
  );

  const editDictionary = (dic, prop, value) => {
    setDictionaries((old) => {
      const newDictionaries = old;
      newDictionaries[dic][prop] = value;
      return newDictionaries;
    });
  };

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        dictionaries,
        setDictionaries,
        editDictionary,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  const value = useContext(SearchContext);

  // throw an error if context is not defined or, when [useSearch] is used outside of [SearchProvider]
  if (value === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return value;
};

export { SearchProvider, useSearch };
