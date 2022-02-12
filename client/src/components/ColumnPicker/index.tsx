import { Dropdown, ItemsGroup } from "react-flatifycss";
import { useLayout } from "../../contexts/layout";
import { setLocalStorage } from "../../utils/localStorage";
import columns from "./columns";

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
