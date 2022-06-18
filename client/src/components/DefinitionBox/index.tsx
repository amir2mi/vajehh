import React, { useState } from "react";
import clsx from "clsx";
import Highlighter from "react-highlight-words";
import Icons from "../Icons";
import "./style.scss";

interface DefinitionBoxProps {
  children?: string | React.ReactNode;
  className?: string;
  definition?: string | string[];
  hasMultipleLine?: boolean;
  highlight?: string[] | false;
  highlightColor?: string;
  limit?: number | false;
  title: string;
  titleTagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function DefinitionBox(props: DefinitionBoxProps) {
  const { children, className, definition, hasMultipleLine, highlight, highlightColor, limit, title, titleTagName } =
    props;
  const Heading = titleTagName || "h2";
  const [isLimited, setIsLimited] = useState(definition && limit && definition.length > limit);

  return (
    <div className={clsx("definition-box", className && className)}>
      <Heading className="definition-title">{title}</Heading>
      <p className={clsx("definition-content", isLimited && "limited")}>
        {hasMultipleLine && Array.isArray(definition) ? (
          definition.map((line: string, index) => {
            return (
              <>
                {highlight ? (
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
                )}
                <br />
              </>
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
        {isLimited && (
          <button
            className="show-more"
            title="نمایش بیشتر"
            aria-label="نمایش بیشتر"
            onClick={() => setIsLimited(false)}
          >
            <Icons.More />
          </button>
        )}
      </p>
    </div>
  );
}
