import clsx from "clsx";
import "./style.scss";

interface MessageBoxProps {
  children?: string | React.ReactNode;
  description?: string;
  message?: string;
  title?: string;
  [rest: string]: any;
}

export default function MessageBox({ children, description, className, message, title, ...rest }: MessageBoxProps) {
  return (
    <div className={clsx("message-box", className)} {...rest}>
      <div className="message-text">
        {message || children ? (
          <>
            {message}
            {children}
          </>
        ) : null}
        {title || description ? (
          <>
            <h3 className="title">{title}</h3>
            {description && <p className="description">{description}</p>}
          </>
        ) : null}
      </div>
    </div>
  );
}
