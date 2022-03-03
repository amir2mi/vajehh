interface FeatureBoxProps {
  description?: string;
  icon?: string | React.ReactNode;
  target?: string;
  title: string;
  url?: string;
}

export default function FeatureBox({ description, icon, target, title, url }: FeatureBoxProps) {
  const Feature = url ? "a" : "div";

  return (
    <Feature className="feature-box" href={url} target={url && target}>
      {icon && (
        <span aria-hidden className="icon">
          {icon}
        </span>
      )}
      <h3 className="title">{title}</h3>
      {description && <p className="description">{description}</p>}
    </Feature>
  );
}
