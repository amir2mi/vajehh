import clsx from "clsx";
import "./style.scss";

interface MessageBoxProps {
  children?: string | React.ReactNode;
  message?: string;
  [rest: string]: any;
}

export default function MessageBox({ children, className, message, ...rest }: MessageBoxProps) {
  return (
    <div className={clsx("message-box", className)} {...rest}>
      <div className="message-text">
        {message}
        {children}
      </div>
    </div>
  );
}
