import clsx from "clsx";
import "./style.scss";

interface FireflyProps {
  animated?: boolean;
  className?: string;
  color?: string;
}

export default function Firefly({ animated, className }: FireflyProps) {
  return <span aria-hidden className={clsx("firefly", className, animated && "animated")} />;
}
