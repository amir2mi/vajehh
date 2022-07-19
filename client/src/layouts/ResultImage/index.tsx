import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "../../contexts/search";
import { getWordImage } from "../../services/api";
import type { AllowedDictionaries } from "../../contexts/dictionary";
import "./style.scss";

interface SearchResponseProps {
  kind: string;
  url: string;
  message: string;
}

export default function ResultImage() {
  const [searchParams] = useSearchParams();
  const [imageUrl, setImageUrl] = useState<string>("");
  const { searchValue } = useSearch();

  const activeTab = searchParams.get("tab") as AllowedDictionaries;

  const search = useCallback(async () => {
    try {
      const response = await getWordImage(activeTab, searchValue);
      const { url } = response?.data as SearchResponseProps;
      setImageUrl(url);
    } catch (e) {
      setImageUrl("");
      console.error(e);
    }
  }, [activeTab, searchValue]);

  useEffect(() => {
    if (!activeTab || !searchValue) return;

    // get image url
    search();
  }, [searchValue, activeTab, search]);

  return (
    <>
      {imageUrl && (
        <figure className="search-result-image">
          <img src={imageUrl} alt={document.title} loading="lazy" />
          <figcaption className="text-center">تصویر برای نتایج جستجوی {searchValue}</figcaption>
        </figure>
      )}
    </>
  );
}
