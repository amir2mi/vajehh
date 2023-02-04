import { createContext, useContext, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

interface SettingsProviderProps {
  children: React.ReactNode;
}

type HighlightColors = "blue" | "green" | "pink" | "purple" | "yellow" | "red";

interface SettingsContextProps {
  columnsCount: number;
  setColumnsCount: (value: number) => void;
  autoSearch: boolean;
  setAutoSearch: (value: boolean) => void;
  fuzzySearch: boolean;
  setFuzzySearch: (value: boolean) => void;
  imageSearch: boolean;
  setImageSearch: (value: boolean) => void;
  audioSearch: boolean;
  setAudioSearch: (value: boolean) => void;
  limitHeight: boolean;
  setLimitHeight: (value: boolean) => void;
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
    autoSearch: true,
    fuzzySearch: true,
    imageSearch: true,
    audioSearch: true,
    limitHeight: true,
    highlight: true,
    highlightColor: "blue",
  });

  const [columnsCount, setColumnsCount] = useState<number>(userSettings.columns);
  const [autoSearch, setAutoSearch] = useState<boolean>(userSettings.autoSearch);
  const [fuzzySearch, setFuzzySearch] = useState<boolean>(userSettings.fuzzySearch);
  const [imageSearch, setImageSearch] = useState<boolean>(userSettings.imageSearch);
  const [audioSearch, setAudioSearch] = useState<boolean>(userSettings.audioSearch);
  const [limitHeight, setLimitHeight] = useState<boolean>(userSettings.limitHeight);
  const [highlight, setHighlight] = useState<boolean>(userSettings.highlight);
  const [highlightColor, setHighlightColor] = useState<HighlightColors>(userSettings.highlightColor);

  return (
    <SettingsContext.Provider
      value={{
        columnsCount,
        setColumnsCount,
        autoSearch,
        setAutoSearch,
        fuzzySearch,
        setFuzzySearch,
        imageSearch,
        setImageSearch,
        audioSearch,
        setAudioSearch,
        limitHeight,
        setLimitHeight,
        highlight,
        setHighlight,
        highlightColor,
        setHighlightColor,
      }}
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

export { SettingsContext, SettingsProvider, useSettings };
