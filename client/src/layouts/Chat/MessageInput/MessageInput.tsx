import { Icons } from "@components";
import { FormEvent, useState } from "react";
import { Button, Input } from "react-flatifycss";
import "./style.scss";

export default function MessageInput() {
  const [question, setQuestion] = useState<string>();

  const handeOnSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="message-form" onSubmit={handeOnSubmit}>
      <Input
        autoFocus
        hasFloatingLabel
        autoComplete="off"
        label="متن پیام"
        placeholder="متن پیام"
        value={question}
        onChange={(value) => setQuestion(value)}
        wrapperClassName="message-input text-auto"
      />
      <Button aria-label="ارسال پیام" theme="accent" className="send-button">
        <Icons.Send />
      </Button>
    </form>
  );
}
