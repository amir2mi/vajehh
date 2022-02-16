import Masonry from "react-masonry-css";
import { useSettings } from "../../contexts/settings";

interface MasonryGridProps {
  children: React.ReactNode;
}

export default function MasonryGrid({ children }: MasonryGridProps) {
  const { columnsCount } = useSettings();

  const breakpointColumnsObj = {
    default: columnsCount,
    1200: columnsCount < 3 ? columnsCount : 3,
    767: columnsCount === 1 ? 1 : 2,
    575: columnsCount > 2 ? 2 : 1,
  };

  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="result-grid" columnClassName="result-grid-column">
      {children}
    </Masonry>
  );
}
