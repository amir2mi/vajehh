import React, { createContext, useContext, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

interface SettingsProviderProps {
  children: React.ReactNode;
}

type HighlightColors = "blue" | "green" | "pink" | "purple" | "yellow" | "red";

interface SettingsContextProps {
  columnsCount: number;
  setColumnsCount: (value: number) => void;
  highlight: boolean;
  setHighlight: (value: boolean) => void;
  highlightColor: HighlightColors;
  setHighlightColor: (value: HighlightColors) => void;
}

const SettingsContext = createContext<undefined | SettingsContextProps>(undefined);

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  // use local storage to get selected columns count, if local storage is empty set default value
  const userSettings = getLocalStorage("settings", {
    columns: 2,
    highlight: true,
    highlightColor: "yellow",
  });
console.log(getLocalStorage("settings"));

  const [columnsCount, setColumnsCount] = useState<number>(userSettings.columns);
  const [highlight, setHighlight] = useState<boolean>(userSettings.highlight);
  const [highlightColor, setHighlightColor] = useState<HighlightColors>(userSettings.highlightColor);

  return (
    <SettingsContext.Provider
      value={{ columnsCount, setColumnsCount, highlight, setHighlight, highlightColor, setHighlightColor }}
    >
      {children}
    </SettingsContext.Provider>
  );
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
