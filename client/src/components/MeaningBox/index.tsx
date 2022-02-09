interface MeaningBoxProps {
  children?: string | React.ReactNode;
  meaning?: string;
  title: string;
  titleTagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function MeaningBox(props: MeaningBoxProps) {
  const { children, titleTagName, meaning, title } = props;
  const Heading = titleTagName || "h2";

  return (
    <div className="meaning-box">
      <Heading className="meaning-title">{title}</Heading>
      {meaning && <p>{meaning}</p>}
      {children}
    </div>
  );
}
