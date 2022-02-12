import React, { createContext, useContext, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

interface LayoutProviderProps {
  children: React.ReactNode;
}

interface LayoutContextProps {
  columnsCount: number;
  setColumnsCount: (value: number) => void;
}

const LayoutContext = createContext<undefined | LayoutContextProps>(undefined);

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  // use local storage to get selected columns count, if local storage is empty set default value
  const [columnsCount, setColumnsCount] = useState<number>(getLocalStorage("columns", 2));

  return <LayoutContext.Provider value={{ columnsCount, setColumnsCount }}>{children}</LayoutContext.Provider>;
};

const useLayout = () => {
  const value = useContext(LayoutContext);

  // throw an error if context is not defined or, when [useSearch] is used outside of [SearchProvider]
  if (value === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }

  return value;
};

export { LayoutProvider, useLayout };
