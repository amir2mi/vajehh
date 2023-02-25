import { Icons } from "@components";
import { useMessages } from "@contexts/messages";
import { chat } from "@services/api";
import { FormEvent, useState } from "react";
import { Button, Input, Toast } from "react-flatifycss";
import "./style.scss";

export default function MessageInput() {
  const { addMessage } = useMessages();
  const [prompt, setPrompt] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAnswer = async (prompt: string) => {
    if (!prompt) return;

    try {
      setLoading(true);
      const { data } = await chat({ prompt });

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
      <Toast autoClose theme="danger" size="sm" y="top" show={!!error} onClose={() => setError("")}>
        {error}
      </Toast>
    </form>
  );
}
