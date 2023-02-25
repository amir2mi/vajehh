import clsx from "clsx";
import Highlight from "react-highlight";
import { Badge } from "react-flatifycss";
import SanitizeHTML from "@components/SanitizeHTML";
import { timeSince } from "@utils/dateTime";
import checkIsCodeSnippet from "@utils/isCode";
import ferdowsiAvatar from "@assets/images/ferdowsi-avatar.png";
import defaultAvatar from "@assets/images/none.jpeg";
import type { MessageProps } from "@contexts/messages";
import "./style.scss";

interface BubbleProps extends MessageProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Bubble({ children, className, isQuestion, body, date }: BubbleProps) {
  const bodyInfo = checkIsCodeSnippet(body);

  return (
    <article className={clsx("bubble", isQuestion ? "question" : "answer", className)}>
      <img className="avatar" src={isQuestion ? defaultAvatar : ferdowsiAvatar} alt="اواتار" />
      <time className="date-time" dateTime={String(date)}>
        {timeSince(date)}
      </time>
      <div>
        {bodyInfo.isCode ? (
          <div>
            <Badge>{bodyInfo?.language}</Badge>
            <Highlight className={bodyInfo?.language}>{body.replace("\n\n", "")}</Highlight>
          </div>
        ) : (
          <p>
            <SanitizeHTML>{body.replace("\n\n", " ").replaceAll("\n", "<br/>")}</SanitizeHTML>
          </p>
        )}
        {children}
      </div>
    </article>
  );
}
