import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "react-flatifycss";
import { useSearch } from "../../contexts/search";
import { useDictionary } from "../../contexts/dictionary";
import { Icons, IntroBox } from "../../components";
import TabTitle from "./TabTitle";
import TabBody from "./TabBody";
import NoActiveTab from "./NoActiveTab";
import "./style.scss";

interface ResultCountProps {
  dehkhoda?: number;
  teyfi?: number;
  motaradef?: number;
  sereh?: number;
  farhangestan?: number;
  ganjvar?: number;
}

export default function ResultTabs() {
  const [searchParams] = useSearchParams();

  const { searchValue } = useSearch();
  const { dictionaries } = useDictionary();

  const [resultCount, setResultCount] = useState<ResultCountProps>({});

  const activeTab = searchParams.get("tab") || "dehkhoda";

  // use tabList[activeTab] to set the default tab index
  // here we assume all tabs are active by default
  const tabsList = {
    dehkhoda: 0,
    teyfi: 1,
    motaradef: 2,
    sereh: 3,
    farhangestan: 4,
    ganjvar: 5,
  };

  // set [-1] to indicate that the tab is loading
  const handleOnSearch = (dic: string) => {
    setResultCount((prev) => ({
      ...prev,
      [dic]: -1, // loading
    }));
  };

  // set the result count for given dictionary
  const handleOnFinish = (dic: string, count: number) => {
    setResultCount((prev) => ({
      ...prev,
      [dic]: count,
    }));
  };

  const handleOnTabClick = (value: string) => {
    scrollToTop(value);
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

  // if any dictionary except "Emalei" (because it is not a tab) is active, return true
  const hasActiveDictionary = () =>
    Object.values(dictionaries).filter((dict) => dict.key !== "emlaei" && dict.active === true).length > 0;

  // reset result count when search value changes to empty string
  useEffect(() => {
    if (!searchValue.trim()) setResultCount({});

    return () => {
      setResultCount({});
    };
  }, [searchValue]);

  interface tabProps {
    title: string;
    value: "dehkhoda" | "teyfi" | "motaradef" | "sereh" | "farhangestan" | "ganjvar";
    description: string;
    icon: React.ReactNode;
    postsPerPage: number;
  }

  const tabs: tabProps[] = [
    {
      title: "دهخدا",
      value: "dehkhoda",
      description: "نسخه مختصرشده واژه‌نامه دهخدا به شما کمک می‌کند تا معنی، تفسیر و شرح تاریخی واژه‌ها را پیدا کنید.",
      icon: <Icons.IntroDehkhoda />,
      postsPerPage: 10,
    },
    {
      title: "طیفی",
      value: "teyfi",
      description:
        "فرهنگ طیفی شبکه‌ای از واژگان مرتبط به‌همدیگر است، این فرهنگ کمک می‌کند تا واژگانی که نوک زبانتان گیر کرده ولی به خاطر نمی‌آورید را به‌سادگی پیدا کنید.",
      icon: <Icons.IntroTeyfi />,
      postsPerPage: 10,
    },
    {
      title: "مترادف",
      value: "motaradef",
      description:
        "این فرهنگ ارزشمند دربردارنده‌ی حجم زیادی از واژگان مترادف و متضاد فارسی است، استفاده از این فرهنگ راه خوبی برای تقویت دایره‌ی واژگان است.",
      icon: <Icons.IntroMotaradef />,
      postsPerPage: 10,
    },
    {
      title: "سره",
      value: "sereh",
      description: "با کمک این واژه‌نامه می‌توانید معادل سرهٔ واژگان بیگانه را پیدا کنید.",
      icon: <Icons.IntroSereh />,
      postsPerPage: 10,
    },
    {
      title: "فرهنگستان",
      value: "farhangestan",
      description: "با کمک این فرهنگ می‌توانید برابر فارسی اصطلاحات و واژگان بیگانه را پیدا کنید.",
      icon: <Icons.IntroFarhangestan />,
      postsPerPage: 10,
    },
    {
      title: "گنجور",
      value: "ganjvar",
      description:
        "با استفاده از این فرهنگ می‌توانید نوشته‌های خود را مزین به اشعار فارسی کنید؛ کافی است واژگان موردنظر و در صورت لزوم نام شاعر را وارد کنید تا نتایج مرتبط ظاهر شود.",
      icon: <Icons.IntroGanjvar />,
      postsPerPage: 4,
    },
  ];

  return !hasActiveDictionary() ? (
    <NoActiveTab />
  ) : (
    <Tabs scrollable defaultIndex={tabsList[activeTab]} className="result-tabs" bordered={true}>
      <TabList>
        {tabs.map(
          ({ title, value }, i) =>
            dictionaries[value].active && (
              <Tab key={`${i}_${value}`} onClick={() => handleOnTabClick(value)}>
                <TabTitle title={title} value={resultCount[value]} />
              </Tab>
            )
        )}
      </TabList>
      <TabPanels animation="fade">
        {tabs.map(
          ({ title, value, postsPerPage, icon, description }, i) =>
            dictionaries[value].active && (
              <TabPanel key={`${i}_${value}`}>
                <TabBody
                  postsPerPage={postsPerPage}
                  dict={value}
                  onSearch={() => handleOnSearch(value)}
                  onFinish={(count) => handleOnFinish(value, count)}
                >
                  <IntroBox title={title} icon={icon}>
                    {description}
                  </IntroBox>
                </TabBody>
              </TabPanel>
            )
        )}
      </TabPanels>
    </Tabs>
  );
}
