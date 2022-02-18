import { Tabs } from "react-flatifycss";
import { useDictionary } from "../../contexts/dictionary";
import IntroBox from "../IntroBox";
import Icons from "../Icons";
import TabBody from "./TabBody";
import "./style.scss";

export default function ResultTabs() {
  const { dictionaries } = useDictionary();

  const items = [
    {
      title: "مترادف",
      content: (
        <TabBody postsPerPage={10} dic="motaradef">
          <IntroBox title="مترادف" icon={<Icons.IntroMotaradef />}>
            این فرهنگ ارزشمند نوشتهٔ فرج‌الله خداپرستی دربردارندهٔ حجم زیادی از واژگان مترادف و متضاد فارسی است. استفاده
            از این فرهنگ راه خوبی برای تقویت دایرهٔ واژگان است.
          </IntroBox>
        </TabBody>
      ),
      isHidden: !dictionaries.motaradef.active,
      buttonTagName: "a",
      buttonHref: "#app-title",
    },
    {
      title: "سره",
      content: (
        <TabBody postsPerPage={10} dic="sereh">
          <IntroBox title="سره" icon={<Icons.IntroSereh />}>
            با کمک این واژه‌نامه می‌توانید معادل سرهٔ واژگان بیگانه را پیدا کنید.
          </IntroBox>
        </TabBody>
      ),
      isHidden: !dictionaries.sereh.active,
      buttonTagName: "a",
      buttonHref: "#app-title",
    },
    {
      title: "طیفی",
      content: (
        <TabBody postsPerPage={10} dic="teyfi">
          <IntroBox title="طیفی" icon={<Icons.IntroTeyfi />}>
            فرهنگ طیفی، واژگانی را که به هر نوعی با هم در ارتباط هستند را گرد آورده است. این فرهنگ کمک می‌کند تا واژگانی
            را که نوک زبانتان گیر کرده ولی به خاطر نمی‌آورید به‌سادگی پیدا کنید.
          </IntroBox>
        </TabBody>
      ),
      isHidden: !dictionaries.teyfi.active,
      buttonTagName: "a",
      buttonHref: "#app-title",
    },
    {
      title: "فرهنگستان",
      content: (
        <TabBody postsPerPage={10} dic="farhangestan">
          <IntroBox title="فرهنگستان" icon={<Icons.IntroFarhangestan />}>
            با کمک این فرهنگ می‌توانید برابر فارسی اصطلاحات و کلمات بیگانه را پیدا کنید.
          </IntroBox>
        </TabBody>
      ),
      isHidden: !dictionaries.farhangestan.active,
      buttonTagName: "a",
      buttonHref: "#app-title",
    },
    {
      title: "گنجور",
      content: (
        <TabBody postsPerPage={4} dic="ganjvar">
          <IntroBox title="گنجور" icon={<Icons.IntroGanjvar />}>
            با استفاده از این فرهنگ می‌توانید نوشته‌های خود را مزین به اشعار فارسی کنید. کافی است واژگان موردنظر و در
            صورت لزوم نام شاعر را وارد کنید تا نتایج مرتبط ظاهر شود.
          </IntroBox>
        </TabBody>
      ),
      isHidden: !dictionaries.ganjvar.active,
      buttonTagName: "a",
      buttonHref: "#app-title",
    },
  ];

  return <Tabs scrollable className="result-tabs" items={items} animation="fade" bordered={true} />;
}
