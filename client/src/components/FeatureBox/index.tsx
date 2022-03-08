import clsx from "clsx";
import { MessageBox } from "..";
import "./style.scss";

interface FeatureBoxProps {
  className?: string;
  description?: string;
  icon?: string | React.ReactNode;
  target?: string;
  title: string;
  url?: string;
}

export default function FeatureBox({ className, description, icon, target, title, url }: FeatureBoxProps) {
  const Feature = url ? "a" : "div";

  return (
    <Feature className={clsx("feature-box", className)} href={url} target={url && target}>
      {icon && (
        <span aria-hidden className="icon">
          {icon}
        </span>
      )}
      <MessageBox title={title} description={description} />
    </Feature>
  );
}
