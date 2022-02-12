import { Dropdown, ItemsGroup } from "react-flatifycss";
import { useSettings } from "../../contexts/settings";
import { setLocalStorage } from "../../utils/localStorage";
import columns from "./columns";
import "./style.scss";

export default function SearchSettings() {
  const { columnsCount, setColumnsCount } = useSettings();

  const handleOnChange = (value: number) => {
    setColumnsCount(value);

    // set current columns count to local storage for next time user opens the app
    setLocalStorage("columns", value);
  };

  return (
    <Dropdown autoClose="outside" size="xs" buttonLabel="تنظیمات" buttonArrow={true} offsetY={12}>
      <p className="menu-item heading">تعداد ستون‌ها</p>
      <ItemsGroup
        items={columns}
        className="column-picker"
        value={columnsCount}
        onChange={(value) => handleOnChange(value)}
      />
    </Dropdown>
  );
}
