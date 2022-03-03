import clsx from "clsx";
import "./style.scss";

interface InfoProps {
  className?: string;
  subtitle?: string | React.ReactNode;
  title: string | React.ReactNode;
}

export default function Info({ className, subtitle, title }: InfoProps) {
  return (
    <>
      <div className={clsx("info", className)}>
        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>
      </div>
    </>
  );
}
