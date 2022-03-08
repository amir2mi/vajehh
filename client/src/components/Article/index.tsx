import clsx from "clsx";
import Markdown from "markdown-to-jsx";

interface ArticleProps {
  [key: string]: any;
  children: string;
}

export default function Article({ className, children }: ArticleProps) {
  return (
    <article className={clsx("article-area", className)}>
      <Markdown>{children}</Markdown>
    </article>
  );
}
