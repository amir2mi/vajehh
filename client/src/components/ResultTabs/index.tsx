import Masonry from "react-masonry-css";
import { Badge, Tabs } from "react-flatifycss";
import { useSettings } from "../../contexts/settings";
import DefinitionBox from "../DefinitionBox";
import "./style.scss";

export default function ResultTabs() {
  const { columnsCount, highlight, highlightColor } = useSettings();

  const breakpointColumnsObj = {
    default: columnsCount,
    1200: columnsCount < 3 ? columnsCount : 3,
    767: columnsCount === 1 ? 1 : 2,
    575: 1,
  };

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
        <Masonry breakpointCols={breakpointColumnsObj} className="result-grid" columnClassName="result-grid-column">
          <DefinitionBox
            title="تست عنوان"
            definition="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از مه و مجله در ستون و سطرآنچنان که لازمه است"
            highlight={highlight && ["متن", "لازمه"]}
            highlightColor={highlightColor}
          />
          <DefinitionBox title="تست عنوان" definition="لورم ایپسوم متن ساختگیت" />{" "}
          <DefinitionBox
            title="تست عنوان"
            definition="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون راحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سو سطرآنچنان که لازم است"
            highlight={highlight && ["متن", "لازمه"]}
            highlightColor={highlightColor}
          />
          <DefinitionBox
            title="تست عنوان"
            definition="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است"
            highlight={highlight && ["متن", "لازمه"]}
            highlightColor={highlightColor}
          />
          <DefinitionBox
            title="تست عنوان"
            definition="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است"
            highlight={highlight && ["متن", "لازمه"]}
            highlightColor={highlightColor}
          />
          <DefinitionBox
            title="تست عنوان"
            definition="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است"
            highlight={highlight && ["متن", "لازمه"]}
            highlightColor={highlightColor}
          />
          <DefinitionBox
            title="تست عنوان"
            definition="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون راحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سو سطرآنچنان که لازم است"
            highlight={highlight && ["متن", "لازمه"]}
            highlightColor={highlightColor}
          />
          <DefinitionBox
            title="تست عنوان"
            definition="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون راحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سو سطرآنچنان که لازم است"
            highlight={highlight && ["متن", "لازمه"]}
            highlightColor={highlightColor}
          />
        </Masonry>
      ),
    },
  ];

  return <Tabs className="result-tabs" items={items} animation="fade" bordered={true} />;
}
