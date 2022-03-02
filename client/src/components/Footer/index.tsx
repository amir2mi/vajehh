import { Button } from "react-flatifycss";
import config from "../../config.json";
import "./style.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="inner-footer">
        <p className="copyright">
          واژه{" "}
          <a href={config.githubURL} target="_blank" rel="noreferrer">
            متن‌باز
          </a>{" "}
          منتشر شده و تمامی حقوق محفوظ است - <span className="opacity-70">نسخه {config.version}</span>
        </p>

        <ul className="footer-nav">
          <li>
            <a href="https://vajehdan.com/" target="_blank" rel="nofollow noreferrer">
              نسخه ویندوز
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
