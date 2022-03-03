import { useNavigate } from "react-router-dom";
import { Button } from "react-flatifycss";
import Icons from "../Icons";
import Info from "../Info";
import FeatureBox from "../FeatureBox";
import "./style.scss";

export default function Features() {
  const navigate = useNavigate();

  return (
    <div className="features">
      <div className="features-intro">
        <Info
          title="با واژه می‌تونی..."
          subtitle="خیلی راحت و سریع بین فرهنگ‌های مختلف جستجو کنی و متن بهتری بنویسی."
        />
        <Button theme="blue" onClick={() => navigate("/search")}>
          شروع جستجو
        </Button>
        <Button onClick={() => navigate("/help")}>اطلاعات بیشتر</Button>
      </div>
      <div className="features-items">
        <FeatureBox
          icon={<Icons.Star />}
          title="انتخاب بهترین واژه"
          description="با استفاده از منابعی از جمله فرهنگ مترادف و متضاد، طیفی و واژه‌نامه سره بهترین واژه را پیدا کنید."
        />
        <FeatureBox
          icon={<Icons.Quill />}
          title="یک بیت شعر"
          description="با جستجو در مجموعه عظیم گنجور همیشه یک بیت شعر مناسب با موضوع شما پیدا می‌شود."
        />
        <FeatureBox
          icon={<Icons.Cursor />}
          title="اصلاح اشتباهات املائی"
          description="فرهنگ املائی خط فارسی به سادگی اشتباهات رایج املائی و نگارشی را به شما اطلاع می‌دهد."
        />
        <FeatureBox
          icon={<Icons.Update />}
          title="جایگزینی واژگان بیگانه"
          description="با استفاده از مجموعه چند جلدی فرهنگستان و سره می‌توانید معادل واژگان بیگانه را پیدا کنید."
        />
      </div>
    </div>
  );
}
