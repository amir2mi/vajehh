import { NavLink } from "react-router-dom";
import { Button } from "react-flatifycss";
import { shareVajehh } from "../../utils/share";
import { Info } from "../../components";
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
        <NavLink to="/donate" className="button style-dark">
          حمایت مالی
        </NavLink>
      </div>
    </div>
  );
}
