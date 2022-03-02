import Icons from "../Icons";
import MessageBox from "../MessageBox";
import "./style.scss";

export default function AfterHeader() {
  return (
    <div className="after-header">
      <div className="main-svg flex-center">
        <Icons.Writing />
      </div>
      <div className="floating-message">
        <span className="line" aria-hidden>
          <span className="pulse edge-circle"></span>
        </span>
        <MessageBox>
          برای غواصی در اقیانوس واژه‌های فارسی به <strong>تجهیزات</strong> نیاز داری!
        </MessageBox>
      </div>
    </div>
  );
}
