import React from "react";
import "./style.scss";

interface SearchInfoProps {
  onSuggestionClick?: (suggestion: string) => void;
}

export default function SearchInfo(props: SearchInfoProps) {
  const { onSuggestionClick } = props;

  return <div className="search-info size-sm">test</div>;
}
