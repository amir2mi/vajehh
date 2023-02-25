import { createContext, useContext, useState } from "react";
import { getLocalStorage } from "@utils/localStorage";

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
  const htmlElement = document.querySelector(":root");

  // if the nightmode is set to "auto" follow operating system preference
  if (nightMode === "auto") {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      nightMode = true;
    } else {
      nightMode = false;
    }
  }

  // set the html element class to dark or light
  if (nightMode) {
    htmlElement?.classList.add("nightmode");
  } else {
    htmlElement?.classList.remove("nightmode");
  }

  // and return the class name
  return nightMode ? "nightmode" : "";
};

export { ThemeContext, ThemeProvider, useTheme, getNightModeClass };
