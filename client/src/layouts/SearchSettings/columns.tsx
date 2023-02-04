import { ItemsGroup } from "react-flatifycss";
import { useSettings } from "../../contexts/settings";
import { setLocalStorageProp } from "../../utils/localStorage";
import Icons from "../../components/Icons";

// the list of column options
const columns = [
  {
    title: "تک ستونه",
    svg: <Icons.OneColumn />,
    value: 1,
  },
  {
    title: "دو ستونه",
    svg: <Icons.TwoColumns />,
    value: 2,
  },
  {
    title: "سه ستونه",
    svg: <Icons.ThreeColumns />,
    value: 3,
  },
  {
    title: "چهار ستونه",
    svg: <Icons.FourColumns />,
    value: 4,
  },
];

export default function ColumnSettings() {
  const { columnsCount, setColumnsCount } = useSettings();

  const handleOnChange = (value: number) => {
    setColumnsCount(value);

    // set current columns count to local storage for next time user opens the app
    setLocalStorageProp("settings", "columns", value);
  };

  return (
    <>
      <p className="menu-item heading">تعداد ستون‌ها</p>
      <ItemsGroup
        size="sm"
        items={columns}
        className="column-picker"
        value={columnsCount}
        onChange={(value) => handleOnChange(value)}
      />
    </>
  );
}
