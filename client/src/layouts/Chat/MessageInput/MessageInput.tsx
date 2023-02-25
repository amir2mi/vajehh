import { Icons } from "@components";
import { useMessages } from "@contexts/messages";
import { chat } from "@services/api";
import { FormEvent, useState } from "react";
import { Button, Input } from "react-flatifycss";
import "./style.scss";

export default function MessageInput() {
  const { addMessage } = useMessages();
  const [prompt, setPrompt] = useState<string>();
  const [loading, setLoading] = useState(false);

  const getAnswer = async (prompt: string) => {
    if (!prompt) return;

    try {
      setLoading(true);
      const { data }: any = await chat({ prompt });

      if (data?.result) {
        addMessage({
          body: data?.result,
          date: Date.now(),
          isQuestion: false,
        });
      }
    } catch (e) {
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

  return (
    <form className="message-form" onSubmit={handeOnSubmit}>
      <Input
        autoFocus
        hasFloatingLabel
        autoComplete="off"
        label="متن پیام"
        placeholder="متن پیام"
        value={prompt}
        onChange={(value) => setPrompt(value)}
        wrapperClassName="message-input text-auto"
      />
      <Button disabled={loading} loading={loading} aria-label="ارسال پیام" theme="accent" className="send-button">
        <Icons.Send />
      </Button>
    </form>
  );
}
