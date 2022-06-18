import clsx from "clsx";
import "./style.scss";

interface FireflyProps {
  className?: string;
  color?: string;
}

export default function Firefly({ className }: FireflyProps) {
  return <span aria-hidden className={clsx("firefly", className)} />;
}
