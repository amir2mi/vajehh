import { Dropdown } from "react-flatifycss";
import Icons from "../../components/Icons";
import ColumnSettings from "./columns";
import GeneralSettings from "./general";
import HighlightSettings from "./highlight";
import "./style.scss";

export default function SearchSettings() {
  return (
    <Dropdown
      id="settings-options"
      className="settings-options"
      autoClose="outside"
      size="xs"
      buttonLabel={<Icons.Settings />}
      offsetY={10}
    >
      <ColumnSettings />
      <GeneralSettings />
      <HighlightSettings />
    </Dropdown>
  );
}
