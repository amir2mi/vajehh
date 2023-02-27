import { MessagesProvider } from "@contexts/messages";
import MessageInput from "@layouts/Chat/MessageInput/MessageInput";
import MessagesHistory from "@layouts/Chat/MessagesHistory";
import MessagesIntro from "@layouts/Chat/MessagesIntro";
import { useEffect } from "react";
import "./style.scss";

export default function ChatPage() {
  useEffect(() => {
    document.title = "واژه | چت هوشمند ChatGPT - نسخه آنلاین فارسی";
  }, []);

  return (
    <main className="chat-main container-lg">
      <MessagesProvider>
        <MessagesIntro />
        <MessagesHistory />
        <MessageInput />
      </MessagesProvider>
    </main>
  );
}
