import clsx from "clsx";
import "./style.scss";

interface IntroBoxProps {
  children?: React.ReactNode;
  className?: string;
  icon: React.ReactNode;
  title: React.ReactNode;
}

export default function IntroBox({ children, className, icon, title }: IntroBoxProps) {
  return (
    <div className={clsx("intro-box", className)}>
      <div className="icon">{icon}</div>
      <div className="texts">
        <h2 className="title">{title}</h2>
        {children && <p className="description">{children}</p>}
      </div>
    </div>
  );
}
