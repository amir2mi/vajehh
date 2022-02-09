import { Badge, Tabs } from "react-flatifycss";
import "./style.scss";

export default function ResultTabs() {
  const items = [
    {
      title: (
        <>
          طیفی<Badge roundness="circle" theme="green-light">250</Badge>
        </>
      ),
      content: "",
    },
  ];

  return <Tabs className="result-tabs" items={items} animation="slide" bordered={true} />;
}
