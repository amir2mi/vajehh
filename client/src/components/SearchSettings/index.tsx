import { Dropdown } from "react-flatifycss";
import ColumnSettings from "./columns";
import HighlightSettings from "./highlight";
import "./style.scss";

export default function SearchSettings() {
  return (
    <Dropdown
      className="settings-options"
      autoClose="outside"
      size="xs"
      buttonLabel="تنظیمات"
      buttonArrow={true}
      offsetY={12}
    >
      <ColumnSettings />
      <HighlightSettings />
    </Dropdown>
  );
}