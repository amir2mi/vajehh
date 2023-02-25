import { createContext, useContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";
import { getPoets } from "@services/api";

interface PoetsProviderProps {
  children: React.ReactNode;
}

interface PoetProps {
  [poet: string]: string;
}

interface PoetsContextProps {
  poets: PoetProps | undefined;
}

const PoetsContext = createContext<undefined | PoetsContextProps>(undefined);

const PoetsProvider = ({ children }: PoetsProviderProps) => {
  const cachedPoets = getLocalStorage("poets");
  const [poets, setPoets] = useState(cachedPoets);

  const handleFetchPoets = async () => {
    try {
      const { data } = await getPoets();
      setPoets(data);
      setLocalStorage("poets", data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleFetchPoets();
  }, []);

  return (
    <PoetsContext.Provider
      value={{
        poets,
      }}
    >
      {children}
    </PoetsContext.Provider>
  );
};

const usePoets = () => {
  const value = useContext(PoetsContext);

  // throw an error if context is not defined or, when [useSearch] is used outside of [SearchProvider]
  if (value === undefined) {
    throw new Error("usePoets must be used within a PoetsProvider");
  }

  return value;
};

export { PoetsContext, PoetsProvider, usePoets };
