import { useMessages } from "@contexts/messages";
import { Button } from "react-flatifycss";

export default function MessagesIntro() {
  const { resetMessages, messages } = useMessages();

  return (
    <div className="intro">
      <h1 className="title gradient-text">چت هوشمند واژه</h1>
      <div className="intro-text">
        <p>
          ربات چت هوشمند واژه با استفاده از تکنولوژی GPT-3 از{" "}
          <a href="https://openai.com/" rel="nofollow noreferrer noopenner" target="_blank">
            OpenAI
          </a>{" "}
          کارکرد مشابه ربات{" "}
          <a href="https://openai.com/blog/chatgpt/" rel="nofollow noreferrer noopenner" target="_blank">
            ChatGPT
          </a>{" "}
          را دارد و به سوالات شما پاسخ خواهد داد.
        </p>
        <p className="extra-info">
          فرقی ندارد که فیلسوف باشید یا برنامه‌نویس، ربات هوشمند واژه مشابه ChatGPT می‌تواند به شما کمک کند تا کارهای
          روزانه خود را با سرعت بیشتری انجام دهید.
        </p>
      </div>
      {messages?.length > 1 && (
        <Button size="sm" theme={messages?.length > 10 ? "danger" : "warning"} onClick={() => resetMessages()}>
          پاکسازی تاریخچه پیام‌ها
        </Button>
      )}
    </div>
  );
}
