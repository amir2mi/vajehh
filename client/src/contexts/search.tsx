import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext<undefined | {}>(undefined);

interface SearchProviderProps {
  children: React.ReactNode;
}

const SearchProvider = ({ children }: SearchProviderProps) => {
  const [value, setValue] = useState<string>("");
  const [selectedDicts, setSelectedDicts] = useState({});

  return (
    <SearchContext.Provider
      value={{
        value,
        setValue,
        selectedDicts,
        setSelectedDicts,
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
};

export { SearchProvider, useSearch };
