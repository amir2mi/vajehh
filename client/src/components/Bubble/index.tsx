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

export default function Bubble({ children, className, isQuestion, body, type, date }: BubbleProps) {
  const bodyInfo = checkIsCodeSnippet(body);

  const getTypeLabel = (type) => {
    switch (type) {
      case "standard":
        return "پیشفرض";
      case "summerize":
        return "خلاصه‌نویس";
      case "question-answer":
        return "سوال جواب";
      case "translator":
        return "مترجم";
      case "chat":
        return "گفتگو";
    }
  };

  return (
    <article className={clsx("bubble text-auto", isQuestion ? "question" : "answer", className)}>
      <img className="avatar" src={isQuestion ? defaultAvatar : ferdowsiAvatar} alt="اواتار" />
      <div className="info">
        <time className="datatime" dateTime={String(date)} title={new Date(date).toLocaleString("fa-IR")}>
          {timeSince(date)}
        </time>
        {!isQuestion && <Badge>{getTypeLabel(type)}</Badge>}
      </div>
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
