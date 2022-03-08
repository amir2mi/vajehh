import { useEffect, useState } from "react";
import { Tabs } from "react-flatifycss";
import { useSearch } from "../../contexts/search";
import { useDictionary } from "../../contexts/dictionary";
import { Icons, IntroBox } from "../../components";
import TabTitle from "./TabTitle";
import TabBody from "./TabBody";
import "./style.scss";

interface ResultCountProps {
  motaradef?: number;
  sereh?: number;
  teyfi?: number;
  farhangestan?: number;
  ganjvar?: number;
}

export default function ResultTabs() {
  const { searchValue } = useSearch();
  const { dictionaries } = useDictionary();
  const [resultCount, setResultCount] = useState<ResultCountProps>({});

  // set [-1] to indicate that the tab is loading
  const handleOnSearch = (dic: string) => {
    setResultCount((prev) => ({
      ...prev,
      [dic]: -1,
    }));
  };

  // set the result count for given dictionary
  const handleOnFinish = (dic: string, count: number) => {
    setResultCount((prev) => ({
      ...prev,
      [dic]: count,
    }));
  };

  // if the tab has enough result scroll to top
  const scrollToTop = (dict: string) => {
    if (resultCount[dict] > 4) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // reset result count when search value changes to empty string
  useEffect(() => {
    if (!searchValue.trim()) {
      setResultCount({});
    }
  }, [searchValue]);

  const items = [
    {
      title: <TabTitle title="مترادف" value={resultCount.motaradef} />,
      content: (
        <TabBody
          postsPerPage={10}
          dic="motaradef"
          onSearch={() => handleOnSearch("motaradef")}
          onFinish={(count) => handleOnFinish("motaradef", count)}
        >
          <IntroBox title="مترادف" icon={<Icons.IntroMotaradef />}>
            این فرهنگ ارزشمند دربردارنده‌ی حجم زیادی از واژگان مترادف و متضاد فارسی است، استفاده از این فرهنگ راه خوبی
            برای تقویت دایره‌ی واژگان است.
          </IntroBox>
        </TabBody>
      ),
      isHidden: !dictionaries.motaradef.active,
      onClick: () => scrollToTop("motaradef"),
    },
    {
      title: <TabTitle title="سره" value={resultCount.sereh} />,
      content: (
        <TabBody
          postsPerPage={10}
          dic="sereh"
          onSearch={() => handleOnSearch("sereh")}
          onFinish={(count) => handleOnFinish("sereh", count)}
        >
          <IntroBox title="سره" icon={<Icons.IntroSereh />}>
            با کمک این واژه‌نامه می‌توانید معادل سرهٔ واژگان بیگانه را پیدا کنید.
          </IntroBox>
        </TabBody>
      ),
      isHidden: !dictionaries.sereh.active,
      onClick: () => scrollToTop("sereh"),
    },
    {
      title: <TabTitle title="طیفی" value={resultCount.teyfi} />,
      content: (
        <TabBody
          postsPerPage={10}
          dic="teyfi"
          onSearch={() => handleOnSearch("teyfi")}
          onFinish={(count) => handleOnFinish("teyfi", count)}
        >
          <IntroBox title="طیفی" icon={<Icons.IntroTeyfi />}>
            فرهنگ طیفی، واژگانی را که به هر نوعی با هم در ارتباط هستند را گرد آورده است، این فرهنگ کمک می‌کند تا واژگانی
            را که نوک زبانتان گیر کرده ولی به خاطر نمی‌آورید به‌سادگی پیدا کنید.
          </IntroBox>
        </TabBody>
      ),
      isHidden: !dictionaries.teyfi.active,
      onClick: () => scrollToTop("teyfi"),
    },
    {
      title: <TabTitle title="فرهنگستان" value={resultCount.farhangestan} />,
      content: (
        <TabBody
          postsPerPage={10}
          dic="farhangestan"
          onSearch={() => handleOnSearch("farhangestan")}
          onFinish={(count) => handleOnFinish("farhangestan", count)}
        >
          <IntroBox title="فرهنگستان" icon={<Icons.IntroFarhangestan />}>
            با کمک این فرهنگ می‌توانید برابر فارسی اصطلاحات و کلمات بیگانه را پیدا کنید.
          </IntroBox>
        </TabBody>
      ),
      isHidden: !dictionaries.farhangestan.active,
      onClick: () => scrollToTop("farhangestan"),
    },
    {
      title: <TabTitle title="گنجور" value={resultCount.ganjvar} />,
      content: (
        <TabBody
          postsPerPage={4}
          dic="ganjvar"
          onSearch={() => handleOnSearch("ganjvar")}
          onFinish={(count) => handleOnFinish("ganjvar", count)}
        >
          <IntroBox title="گنجور" icon={<Icons.IntroGanjvar />}>
            با استفاده از این فرهنگ می‌توانید نوشته‌های خود را مزین به اشعار فارسی کنید؛ کافی است واژگان موردنظر و در
            صورت لزوم نام شاعر را وارد کنید تا نتایج مرتبط ظاهر شود.
          </IntroBox>
        </TabBody>
      ),
      isHidden: !dictionaries.ganjvar.active,
      onClick: () => scrollToTop("ganjvar"),
    },
  ];

  return <Tabs scrollable className="result-tabs" items={items} animation="fade" bordered={true} />;
}
