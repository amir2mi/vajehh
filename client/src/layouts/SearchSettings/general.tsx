import { ToggleSwitch } from "react-flatifycss";
import { useSettings } from "../../contexts/settings";
import { setLocalStorageProp } from "../../utils/localStorage";

export default function GeneralSettings() {
  const { autoSearch, setAutoSearch, fuzzySearch, setFuzzySearch } = useSettings();

  const handleAutoSearchToggle = (value: boolean) => {
    setAutoSearch(value);
    setLocalStorageProp("settings", "autoSearch", value);
  };

  const handleFuzzySearchToggle = (value: boolean) => {
    setFuzzySearch(value);
    setLocalStorageProp("settings", "fuzzySearch", value);
  };

  return (
    <>
      <p className="menu-item heading">جستجو</p>
      <ToggleSwitch checked={autoSearch} isAfterLabel={true} onChange={(value) => handleAutoSearchToggle(value)}>
        جستجو خودکار پس از یک ثانیه
      </ToggleSwitch>
      <ToggleSwitch checked={fuzzySearch} isAfterLabel={true} onChange={(value) => handleFuzzySearchToggle(value)}>
        جستجو واژگان مشابه
      </ToggleSwitch>
    </>
  );
}
