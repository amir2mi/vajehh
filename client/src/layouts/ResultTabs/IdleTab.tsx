import { useSearch } from "@contexts/search";
import Error from "./Error";
import NoResult from "./NoResult";

interface IdleTabProps {
  children: React.ReactNode;
  hasError: boolean;
}

export default function IdleTab({ children, hasError }: IdleTabProps) {
  const { searchValue } = useSearch();
  return searchValue?.length < 2 ? <>{children}</> : hasError ? <Error /> : <NoResult />;
}
