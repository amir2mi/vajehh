import { Button } from "react-flatifycss";
import Info from "../Info";
import "./style.scss";

export default function SupportUs() {
  return (
    <div className="support-us">
      <Info
        title="حمایت از واژه"
        subtitle="واژه متن‌باز منتشر شده و استفاده از آن رایگان است، شما می‌توانید از فرآیند توسعه واژه حمایت کنید."
      />
      <div className="call-to-action">
        <Button theme="blue" onClick={() => {}}>
          اشتراک‌گذاری
        </Button>
        <Button onClick={() => {}}>حمایت مالی</Button>
      </div>
    </div>
  );
}
