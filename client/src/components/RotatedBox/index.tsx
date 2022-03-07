import clsx from "clsx";
import "./style.scss";

interface RotatedBoxProps {
  className?: string;
  children?: React.ReactNode;
  rotateContent?: boolean;
}

export default function RotatedBox({ children, className, rotateContent }: RotatedBoxProps) {
  return <div className={clsx("rotated-box", className, rotateContent && "rotate-content")}>{children}</div>;
}
