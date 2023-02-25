import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";

interface MessagesContextProps {
  messages: MessageProps[];
  setMessages: (messages: MessageProps[]) => void;
  addMessage: (message: MessageProps) => void;
  resetMessages: () => void;
}

export type MessageConversationTypes = "standard" | "summerize" | "question-answer" | "translator" | "chat";

export interface MessageProps {
  body: string;
  date: string | number;
  isQuestion: boolean;
  type: MessageConversationTypes;
}

interface MessagesProviderProps {
  children: React.ReactNode;
}

const MessagesContext = createContext<undefined | MessagesContextProps>(undefined);

const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const defaultHistory: MessageProps[] = [
    {
      isQuestion: false,
      body: `به چت هوشمند واژه خوش‌آمدید برای شروع پیامی ارسال کنید.
      از تنظیمات می‌توانید قالب گفتگو را تغییر دهید، هر قالب مشخصه‌های متفاوتی دارد و پاسخ ربات نیز با توجه به قالب متفاوت خواهد بود.`,
      date: Date.now(),
      type: "standard",
    },
  ];

  const cachedMessages = getLocalStorage("messages", defaultHistory);
  const [messages, setMessages] = useState<MessageProps[]>(cachedMessages);

  const addMessage = (message: MessageProps) => {
    setMessages((currentMessages: MessageProps[]) => [...currentMessages, message]);
  };

  const resetMessages = () => {
    setMessages(defaultHistory);
  };

  useEffect(() => {
    setLocalStorage("messages", messages);
  }, [messages]);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        setMessages,
        addMessage,
        resetMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

const useMessages = () => {
  const value = useContext(MessagesContext);

  if (value === undefined) {
    throw new Error("useMessages must be used within a PoetsProvider");
  }

  return value;
};

export { MessagesContext, MessagesProvider, useMessages };
