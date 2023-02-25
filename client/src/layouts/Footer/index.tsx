import { Button } from "react-flatifycss";
import config from "@config.json";
import { Icons } from "@components";
import "./style.scss";

export default function Footer() {
  return (
    <footer className="footer main-container">
      <div className="inner-footer">
        <p className="copyright">
          واژه{" "}
          <a href={config.githubURL} target="_blank" rel="noreferrer">
            متن‌باز
          </a>{" "}
          است و تمامی حقوق محفوظ <span className="opacity-70">/ نسخه {config.version}</span>
        </p>

        <ul className="footer-nav">
          <li>
            <Button
              theme="dark"
              size="sm"
              className="go-to-top reduce-brightness"
              aria-label="رفتن به بالای صفحه"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              <Icons.ChevronTop />
            </Button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
