import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ButtonGroup } from "react-flatifycss";
import { Info, Firefly } from "../../components";
import "./style.scss";

export default function NothingFound() {
  useEffect(() => {
    document.title = "صفحه موردنظر پیدا نشد";
  }, []);

  return (
    <section className="nothing-found flex-center">
      <div className="content flex-column-center">
        <Info title="ناکجـاآباد" subtitle="صفحه‌ای که به دنبال آن هستید وجود خارجی ندارد!" />
        <ButtonGroup>
          <Link to="/" className="button style-light">
            رفتن به خانه
          </Link>
          <Link to="/search" className="button style-accent">
            جستجوی واژه
          </Link>
        </ButtonGroup>
      </div>
      <Firefly animated />
    </section>
  );
}
