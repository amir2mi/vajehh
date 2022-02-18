import "./style.scss";

interface TitleProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  subtitle?: string;
  children?: string | React.ReactNode;
}

export default function Title(props: TitleProps) {
  const { children, subtitle, title, ...rest } = props;

  return (
    <div {...rest} className="search-title">
      <h1 className="title">{title}</h1>
      <p className="subtitle">{subtitle}</p>
      {children}
    </div>
  );
}
