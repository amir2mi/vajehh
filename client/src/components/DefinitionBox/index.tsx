import React from "react";
import { isArray } from "lodash";
import Highlighter from "react-highlight-words";
import "./style.scss";

interface DefinitionBoxProps {
  children?: string | React.ReactNode;
  definition?: string | string[];
  hasMultipleLine?: boolean;
  highlight?: string[] | false;
  highlightColor?: string;
  separator?: "space" | "newline";
  title: string;
  titleTagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function DefinitionBox(props: DefinitionBoxProps) {
  const { children, definition, hasMultipleLine, separator, highlight, highlightColor, title, titleTagName } = props;
  const Heading = titleTagName || "h2";

  return (
    <div className="definition-box">
      <Heading className="definition-title">{title}</Heading>

      {hasMultipleLine && isArray(definition) ? (
        definition.map((line: string, index) => {
          // the last line should not have a separator
          const textWithSeparator = definition.length === index + 1 ? line : line + "، ";

          return highlight ? (
            <Highlighter
              key={index}
              className="definition"
              highlightClassName={`marked-word style-${highlightColor}-light`}
              autoEscape={true}
              searchWords={highlight}
              textToHighlight={textWithSeparator}
            />
          ) : (
            <span key={index} className="definition">
              {textWithSeparator}
            </span>
          );
        })
      ) : highlight ? (
        <Highlighter
          className="definition"
          highlightClassName={`marked-word style-${highlightColor}-light`}
          autoEscape={true}
          searchWords={highlight}
          textToHighlight={isArray(definition) ? definition.join(", ") : definition}
        />
      ) : (
        <p className="definition">{isArray(definition) ? definition.join(", ") : definition}</p>
      )}

      {children}
    </div>
  );
}
