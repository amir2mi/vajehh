import clsx from "clsx";
import { ItemsGroup, ToggleSwitch } from "react-flatifycss";
import { useSettings } from "../../contexts/settings";
import { setLocalStorageProp } from "../../utils/localStorage";

export default function GeneralSettings() {
  const { autoSearch, setAutoSearch } = useSettings();

  const handleOnToggle = (value: boolean) => {
    setAutoSearch(value);
    setLocalStorageProp("settings", "autoSearch", value);
  };

  return (
    <>
      <p className="menu-item heading">جستجو</p>
      <ToggleSwitch checked={autoSearch} isAfterLabel={true} onChange={(value) => handleOnToggle(value)}>
        جستجو خودکار پس از یک ثانیه
      </ToggleSwitch>
    </>
  );
}
