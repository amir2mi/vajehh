import { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import clsx from "clsx";
import { TextLoading } from "..";
import "./style.scss";

interface ArticleProps {
  [key: string]: any;
  children?: string;
  file?: string;
}

export default function Article({ className, children, file }: ArticleProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (file) {
      axios.get(file).then((res) => {
        setContent(res.data);
        setLoading(false);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className={clsx("article-area container-md", className)}>
      <Markdown>{children || content}</Markdown>
      {file && loading ? <TextLoading /> : null}
    </article>
  );
}
