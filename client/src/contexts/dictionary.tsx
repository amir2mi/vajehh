import { createContext, useContext, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

interface DictionaryProviderProps {
  children: React.ReactNode;
}

interface DictionariesInfo {
  name: string;
  key: string;
  active: boolean;
  resultCount: number;
}

export type AllowedDictionaries = "dehkhoda" | "teyfi" | "motaradef" | "sereh" | "farhangestan" | "ganjvar" | "emlaei";

export interface Dictionaries {
  [key: string]: DictionariesInfo;
  dehkhoda: DictionariesInfo;
  emlaei: DictionariesInfo;
  farhangestan: DictionariesInfo;
  motaradef: DictionariesInfo;
  ganjvar: DictionariesInfo;
  sereh: DictionariesInfo;
  teyfi: DictionariesInfo;
}

interface DictionaryContextProps {
  dictionaries: Dictionaries;
  setDictionaries: (value: Dictionaries) => void;
  editDictionary: (dic: string, prop: string, value: unknown) => void;
}

const getDefaultDictionaries = () => {
  return {
    emlaei: {
      name: "املائی",
      key: "emlaei",
      active: true,
    },
    dehkhoda: {
      name: "دهخدا",
      key: "dehkhoda",
      active: true,
    },
    teyfi: {
      name: "طیفی",
      key: "teyfi",
      active: true,
    },
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

const DictionaryContext = createContext<undefined | DictionaryContextProps>(undefined);

const DictionaryProvider = ({ children }: DictionaryProviderProps) => {
  // use local storage to get selected dictionaries, if local storage is empty set default dictionaries
  // first add default dictionaries,
  // because it is possible for users local storage config to do not have the newest dictionaries
  const userDictionaries = {
    ...getDefaultDictionaries(),
    ...getLocalStorage("dictionaries", getDefaultDictionaries()),
  };
  const [dictionaries, setDictionaries] = useState<Dictionaries>(() => userDictionaries);

  const editDictionary = (dic, prop, value) => {
    setDictionaries((old) => {
      const newDictionaries = old;
      newDictionaries[dic][prop] = value;
      return newDictionaries;
    });
  };

  return (
    <DictionaryContext.Provider
      value={{
        dictionaries,
        setDictionaries,
        editDictionary,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
};

const useDictionary = () => {
  const value = useContext(DictionaryContext);

  // throw an error if context is not defined or, when [useDictionary] is used outside of [DictionaryProvider]
  if (value === undefined) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }

  return value;
};

export { DictionaryContext, DictionaryProvider, useDictionary };
