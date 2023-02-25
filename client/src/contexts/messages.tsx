import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";

interface MessagesContextProps {
  messages: MessageProps[];
  setMessages: (messages: MessageProps[]) => void;
  addMessage: (message: MessageProps) => void;
  resetMessages: () => void;
}

export interface MessageProps {
  body: string;
  date: string | number;
  isQuestion: boolean;
}

interface MessagesProviderProps {
  children: React.ReactNode;
}

const MessagesContext = createContext<undefined | MessagesContextProps>(undefined);

const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const defaultHistory: MessageProps[] = [
    {
      isQuestion: false,
      body: `به چت هوشمند واژه خوش‌آمدید <br /> برای شروع پیامی ارسال کنید.`,
      date: Date.now(),
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
