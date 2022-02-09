import React, { createContext, useContext, useState } from "react";

interface SearchProviderProps {
  children: React.ReactNode;
}

interface SearchContextProps {
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  dictionaries: {};
  setDictionaries: (value: {}) => void;
}

const SearchContext = createContext<undefined | SearchContextProps>(undefined);

const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [dictionaries, setDictionaries] = useState<object>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <SearchContext.Provider
      value={{
        isSearching,
        setIsSearching,
        searchValue,
        setSearchValue,
        dictionaries,
        setDictionaries,
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
