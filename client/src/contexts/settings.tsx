import React, { createContext, useContext, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

interface SettingsProviderProps {
  children: React.ReactNode;
}

interface SettingsContextProps {
  columnsCount: number;
  setColumnsCount: (value: number) => void;
}

const SettingsContext = createContext<undefined | SettingsContextProps>(undefined);

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  // use local storage to get selected columns count, if local storage is empty set default value
  const [columnsCount, setColumnsCount] = useState<number>(getLocalStorage("columns", 2));

  return <SettingsContext.Provider value={{ columnsCount, setColumnsCount }}>{children}</SettingsContext.Provider>;
};

const useSettings = () => {
  const value = useContext(SettingsContext);

  // throw an error if context is not defined or, when [useSearch] is used outside of [SearchProvider]
  if (value === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return value;
};

export { SettingsProvider, useSettings };
