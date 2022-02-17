import "./style.scss";

interface IntroBoxProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  title: React.ReactNode;
}

export default function IntroBox({ children, icon, title }: IntroBoxProps) {
  return (
    <div className="intro-box">
      <div className="icon">{icon}</div>
      <h2 className="title">{title}</h2>
      <p className="description">{children}</p>
    </div>
  );
}
