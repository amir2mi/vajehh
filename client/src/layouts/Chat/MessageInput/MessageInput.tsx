import { Icons } from "@components";
import { useMessages } from "@contexts/messages";
import { chat, ChatRequestProps } from "@services/api";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Dropdown, DropdownBody, DropdownButton, Input, ItemsGroup, Toast } from "react-flatifycss";
import { ItemProps } from "react-flatifycss/dist/items-group/item";
import "./style.scss";

export default function MessageInput() {
  const { addMessage } = useMessages();
  const [prompt, setPrompt] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversationType, setConversationType] = useState<Partial<ItemProps>>(conversationTypes[0]);
  const messageInputElement = useRef<HTMLInputElement | null>(null);

  const getAnswer = async (prompt: string) => {
    if (!prompt) return;

    try {
      setLoading(true);
      const { data } = await chat({ prompt, type: conversationType.value as ChatRequestProps["type"] });

      if (data?.result) {
        addMessage({
          body: data?.result,
          date: Date.now(),
          isQuestion: false,
        });
      } else {
        setError("سرویس در دسترس نبود، لحظاتی دیگر مجددا تلاش کنید");
      }
    } catch (e) {
      setError("خطایی در دریافت اطلاعات رخ داد، مجددا تلاش کنید");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handeOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!prompt || loading) return;

    // add user message then fetch the respond
    addMessage({
      body: prompt,
      date: Date.now(),
      isQuestion: true,
    });
    getAnswer(prompt);
    setPrompt("");
  };

  const onGlobalKeyDown = (e: KeyboardEvent) => {
    // Accessiblity keyboard navigation: focus search input when "/" is pressed
    const input = messageInputElement?.current;
    if ((e.key === "/" || e.code === "Slash") && document.activeElement !== input) {
      input?.focus();
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", onGlobalKeyDown);
    };
  });

  return (
    <form className="message-form" onSubmit={handeOnSubmit}>
      <Dropdown autoClose id="chat-settings">
        <DropdownButton aria-label={conversationType.title}>{conversationType.svg}</DropdownButton>
        <DropdownBody isMenu>
          <li className="menu-item heading">نوع گفتگو</li>
          <li className="conversation-types">
            <ItemsGroup
              value={conversationType.value || ""}
              onChange={(value) =>
                setConversationType(conversationTypes.find((item) => item.value === value) || conversationType[0])
              }
              items={conversationTypes}
            />
          </li>
        </DropdownBody>
      </Dropdown>
      <Input
        ref={messageInputElement}
        autoFocus
        hasFloatingLabel
        autoComplete="off"
        label="متن پیام"
        placeholder="متن پیام"
        value={prompt}
        onChange={(value) => setPrompt(value)}
        wrapperClassName="message-input text-auto"
      />
      <Button
        disabled={loading}
        loading={loading}
        aria-label={loading ? "در حال پردازش پیام قبلی" : "ارسال پیام"}
        theme="accent"
        className="send-button"
      >
        <Icons.Send />
      </Button>
      <Toast autoClose theme="danger" size="sm" y="top" show={!!error} onClose={() => setError("")}>
        {error}
      </Toast>
    </form>
  );
}

const conversationTypes = [
  {
    title: "پیشفرض",
    value: "standard",
    svg: <Icons.Standard />,
  },
  {
    title: "خلاصه‌نویس",
    value: "summerize",
    svg: <Icons.Summary />,
  },
  {
    title: "سوال جواب",
    value: "question-answer",
    svg: <Icons.QuestionAnswer />,
  },
  {
    title: "مترجم",
    value: "translator",
    svg: <Icons.Translate />,
  },
  {
    title: "گفتگو",
    value: "chat",
    svg: <Icons.Chat />,
  },
];
