import { Badge, Tabs } from "react-flatifycss";
import DefinitionBox from "../DefinitionBox";
import "./style.scss";

export default function ResultTabs() {
  const items = [
    {
      title: (
        <>
          طیفی
          <Badge roundness="circle" theme="green-light">
            250
          </Badge>
        </>
      ),
      content: (
        <>
          <DefinitionBox
            title="تست عنوان"
            definition="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است"
          />
          <DefinitionBox
            title="تست عنوان"
            definition="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است"
          />{" "}
          <DefinitionBox
            title="تست عنوان"
            definition="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است"
          />
          <DefinitionBox
            title="تست عنوان"
            definition="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است"
          />
          <DefinitionBox
            title="تست عنوان"
            definition="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است"
          />
        </>
      ),
    },
  ];

  return <Tabs className="result-tabs" items={items} animation="slide" bordered={true} />;
}
