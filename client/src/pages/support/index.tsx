import { useEffect } from "react";
import { Article } from "@components";
import content from "./support.md";

export default function SupportPage() {
  useEffect(() => {
    document.title = "واژه | پشتیبانی";
  }, []);

  return <Article file={content} />;
}
