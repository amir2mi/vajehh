import { Dropdown, ItemsGroup } from "react-flatifycss";
import { useLayout } from "../../contexts/layout";
import { setLocalStorage } from "../../utils/localStorage";

const columns = [
  {
    title: "تک ستونه",
    subtitle: "تک ستونه",
    svg: "",
    value: 1,
  },
  {
    title: "دو ستونه",
    subtitle: "دو ستونه",
    svg: "",
    value: 2,
  },
  {
    title: "سه ستونه",
    subtitle: "سه ستونه",
    svg: "",
    value: 3,
  },
  {
    title: "چهار ستونه",
    subtitle: "چهار ستونه",
    svg: "",
    value: 4,
  },
];

export default function ColumnPicker() {
  const { columnsCount, setColumnsCount } = useLayout();

  const handleOnChange = (value: number) => {
    setColumnsCount(value);

    // set current columns count to local storage for next time user opens the app
    setLocalStorage("columns", value);
  };

  return (
    <Dropdown autoClose="outside" size="xs" buttonLabel="چینش" buttonArrow={true} offsetY={12}>
      <ItemsGroup items={columns} value={columnsCount} onChange={(value) => handleOnChange(value)} />
    </Dropdown>
  );
}
