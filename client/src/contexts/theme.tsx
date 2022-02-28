import { createContext, useContext, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextProps {
  nightMode: "auto" | boolean;
  setNightMode: (value: boolean | "auto") => void;
}

const ThemeContext = createContext<undefined | ThemeContextProps>(undefined);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeSettings = getLocalStorage("theme", {
    nightMode: "auto",
  });

  const [nightMode, setNightMode] = useState<"auto" | boolean>(themeSettings.nightMode);

  return <ThemeContext.Provider value={{ nightMode, setNightMode }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => {
  const value = useContext(ThemeContext);

  if (value === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return value;
};

const getNightModeClass = (nightMode) => {
  // if the nightmode is set to "auto" follow operating system preference
  if (nightMode === "auto") {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      nightMode = true;
    } else {
      nightMode = false;
    }
  }

  return nightMode ? "night-mode" : "";
};

export { ThemeProvider, useTheme, getNightModeClass };
