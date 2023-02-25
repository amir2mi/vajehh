import { MessagesProvider } from "@contexts/messages";
import MessageInput from "@layouts/Chat/MessageInput/MessageInput";
import MessagesHistory from "@layouts/Chat/MessagesHistory";
import MessagesIntro from "@layouts/Chat/MessagesIntro";
import "./style.scss";

export default function ChatPage() {
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
