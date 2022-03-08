import { Button } from "react-flatifycss";
import config from "../../config.json";
import { shareVajehh } from "../../utils/share";
import { Info } from "..";
import "./style.scss";

export default function SupportUs() {
  return (
    <div className="support-us">
      <Info
        title="حمایت از واژه"
        subtitle="واژه متن‌باز منتشر شده و استفاده از آن رایگان است، شما می‌توانید از فرآیند توسعه واژه حمایت کنید."
      />
      <div className="call-to-action">
        <Button theme="blue" onClick={shareVajehh}>
          {!!navigator.share ? "اشتراک‌گذاری" : "توییت در توییتر"}
        </Button>
        <a href={config.supportURL} className="button" target="_blank" rel="noreferrer">
          حمایت مالی
        </a>
      </div>
    </div>
  );
}
