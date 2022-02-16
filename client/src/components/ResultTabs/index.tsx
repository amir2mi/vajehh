import { Tabs } from "react-flatifycss";
import { useSearch } from "../../contexts/search";
import TabBody from "./TabBody";
import "./style.scss";

export default function ResultTabs() {
  const { dictionaries } = useSearch();

  const items = [
    {
      title: "مترادف",
      content: <TabBody postsPerPage={10} dic="motaradef" />,
      isHidden: !dictionaries.motaradef.active,
    },
    {
      title: "سره",
      content: <TabBody postsPerPage={10} dic="sereh" />,
      isHidden: !dictionaries.sereh.active,
    },
    {
      title: "طیفی",
      content: <TabBody postsPerPage={10} dic="teyfi" />,
      isHidden: !dictionaries.teyfi.active,
    },
    {
      title: "فرهنگستان",
      content: <TabBody postsPerPage={10} dic="farhangestan" />,
      isHidden: !dictionaries.farhangestan.active,
    },
    {
      title: "گنجور",
      content: <TabBody postsPerPage={4} dic="ganjvar" />,
      isHidden: !dictionaries.ganjvar.active,
    },
  ];

  return <Tabs className="result-tabs" items={items} animation="fade" bordered={true} />;
}
