import React from "react";
import clsx from "clsx";
import Highlighter from "react-highlight-words";
import "./style.scss";

interface DefinitionBoxProps {
  children?: string | React.ReactNode;
  className?: string;
  definition?: string | string[];
  hasMultipleLine?: boolean;
  highlight?: string[] | false;
  highlightColor?: string;
  title: string;
  titleTagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function DefinitionBox(props: DefinitionBoxProps) {
  const { children, className, definition, hasMultipleLine, highlight, highlightColor, title, titleTagName } = props;
  const Heading = titleTagName || "h2";

  return (
    <div className={clsx("definition-box", className && className)}>
      <Heading className="definition-title">{title}</Heading>

      {hasMultipleLine && Array.isArray(definition) ? (
        definition.map((line: string, index) => {
          return highlight ? (
            <Highlighter
              key={index}
              className="definition"
              highlightClassName={clsx("marked-word", `style-${highlightColor}-light`)}
              autoEscape={true}
              searchWords={highlight}
              textToHighlight={line}
            />
          ) : (
            <span key={index} className="definition">
              {line}
            </span>
          );
        })
      ) : highlight ? (
        <Highlighter
          className="definition"
          highlightClassName={clsx("marked-word", `style-${highlightColor}-light`)}
          autoEscape={true}
          searchWords={highlight}
          textToHighlight={Array.isArray(definition) ? definition.join("، ") : definition}
        />
      ) : (
        <span className="definition">{Array.isArray(definition) ? definition.join("، ") : definition}</span>
      )}

      {children}
    </div>
  );
}
