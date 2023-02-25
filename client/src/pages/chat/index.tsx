import { ShareBox } from "@components";
import { MessagesProvider } from "@contexts/messages";
import MessagesHistory from "@layouts/Chat/MessagesHistory";

export default function ChatPage() {
  return (
    <main className="chat-main container-lg">
      <MessagesProvider>
        <MessagesHistory />
      </MessagesProvider>
    </main>
  );
}
