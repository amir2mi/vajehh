import "./style.scss";

interface DefinitionBoxProps {
  children?: string | React.ReactNode;
  definition?: string;
  title: string;
  titleTagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function DefinitionBox(props: DefinitionBoxProps) {
  const { children, titleTagName, definition, title } = props;
  const Heading = titleTagName || "h2";

  return (
    <div className="definition-box">
      <Heading className="definition-title">{title}</Heading>
      {definition && <p className="definition">{definition}</p>}
      {children}
    </div>
  );
}
