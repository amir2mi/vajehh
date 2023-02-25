import { useEffect } from "react";
import Bubble from "@components/Bubble";
import { useMessages } from "@contexts/messages";

export default function MessagesHistory() {
  const { messages } = useMessages();

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  return (
    <div>
      {messages?.length &&
        messages.map((message, index) => (
          <Bubble key={String(message.date) + index} className="anim-rise" {...message} />
        ))}
    </div>
  );
}
