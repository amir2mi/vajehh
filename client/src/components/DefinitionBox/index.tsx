import Highlighter from "react-highlight-words";
import "./style.scss";

interface DefinitionBoxProps {
  children?: string | React.ReactNode;
  definition?: string;
  highlight?: string[] | false;
  highlightColor?: string;
  title: string;
  titleTagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function DefinitionBox(props: DefinitionBoxProps) {
  const { children, definition, highlight, highlightColor, title, titleTagName } = props;
  const Heading = titleTagName || "h2";

  return (
    <div className="definition-box">
      <Heading className="definition-title">{title}</Heading>
      {highlight ? (
        <Highlighter
          className="definition"
          highlightClassName={`marked-word style-${highlightColor}-light`}
          autoEscape={true}
          searchWords={highlight}
          textToHighlight={definition}
        />
      ) : (
        <p className="definition">{definition}</p>
      )}
      {children}
    </div>
  );
}
