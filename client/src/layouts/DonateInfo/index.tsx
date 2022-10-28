import { useState } from "react";
import clsx from "clsx";
import { Toast } from "react-flatifycss";
import copy from "copy-text-to-clipboard";
import { Icons, MessageBox } from "../../components";
import DonateInput from "./DonateInput";
import "./style.scss";

// TODO: replace alert() with custom toast component for crypto buttons when the address is copied
export default function DonateInfo() {
  const [copiedToast, setCopiedToast] = useState(false);

  const cryptoButtons = [
    {
      title: "بیت‌کوین",
      address: "bc1qajdanz0wjgy3d2p80rty8t0ss696t227cx3g3c",
      theme: "orange",
      icon: <Icons.Bitcoin />,
    },
    {
      title: "اتریوم",
      address: "0xF3168f1569Df3940159f9b15c268c10EfF317470",
      theme: "dark",
      icon: <Icons.Ether />,
    },
  ];

  return (
    <aside className="donate-info sticky-top anim-rise">
      <h1 className="heading anim-hue">
        باهم، <span className="gradient-text">برای همه</span>
      </h1>
      <p className="donate-text">
        بهترین راه حمایت از واژه معرفی آن به دوستان و آشنایانتان است، البته که می‌توانید در تأمین هزینه‌های نگه‌داری و
        توسعه آن شریک شوید.
      </p>
      <DonateInput />
      {cryptoButtons.map(({ address, icon, theme, title }) => (
        <MessageBox
          key={address}
          as="button"
          className={clsx("icon-info-box", `style-${theme}`)}
          onClick={() => {
            copy(address);
            setCopiedToast(true);
          }}
        >
          {icon}
          <div className="texts">
            <h3 className="title">{title}</h3>
            <p className="description">{address}</p>
          </div>
        </MessageBox>
      ))}
      <Toast closeButton x="right" show={copiedToast} onClose={() => setCopiedToast(false)}>
        آدرس کیف‌پول با موفقیت کپی شد
      </Toast>
    </aside>
  );
}
