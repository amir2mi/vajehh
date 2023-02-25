import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "@contexts/search";
import { SettingsProvider } from "@contexts/settings";
import { DictionaryProvider } from "@contexts/dictionary";
import { ThemeProvider } from "@contexts/theme";

interface TestWrapperProps {
  children: React.ReactNode;
}

export default function TestWrapper({ children }: TestWrapperProps) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SettingsProvider>
          <SearchProvider>
            <DictionaryProvider>{children}</DictionaryProvider>
          </SearchProvider>
        </SettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
