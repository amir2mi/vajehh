import { Tabs } from "react-flatifycss";
import { useSearch } from "../../contexts/search";
import TabBody from "./TabBody";
import "./style.scss";

export default function ResultTabs() {
  const { dictionaries } = useSearch();

  const items = [
    {
      title: "مترادف",
      content: <TabBody dic="motaradef" />,
      isHidden: !dictionaries.motaradef.active,
    },
    {
      title: "سره",
      content: <TabBody dic="sereh" />,
      isHidden: !dictionaries.sereh.active,
    },
    {
      title: "طیفی",
      content: <TabBody dic="teyfi" />,
      isHidden: !dictionaries.teyfi.active,
    },
    {
      title: "فرهنگستان",
      content: <TabBody dic="farhangestan" />,
      isHidden: !dictionaries.farhangestan.active,
    },
    {
      title: "گنجور",
      content: <TabBody dic="ganjvar" />,
      isHidden: !dictionaries.ganjvar.active,
    },
  ];

  return <Tabs className="result-tabs" items={items} animation="fade" bordered={true} />;
}
