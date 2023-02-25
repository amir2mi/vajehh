import { useEffect } from "react";
import { Article } from "@components";
import content from "./help.md";

export default function HelpPage() {
  useEffect(() => {
    document.title = "واژه | راهنما";
  }, []);

  return <Article file={content} />;
}
