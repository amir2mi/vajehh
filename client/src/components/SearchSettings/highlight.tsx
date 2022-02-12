import { Checkbox } from "react-flatifycss";
import { useSettings } from "../../contexts/settings";
import { setLocalStorageProp } from "../../utils/localStorage";

export default function HighlightSettings() {
  const { highlight, setHighlight, highlightColor, setHighlightColor } = useSettings();

  const handleOnToggle = (value: boolean) => {
    setHighlight(value);

    // set current columns count to local storage for next time user opens the app
    setLocalStorageProp("settings", "highlight", value);
  };

  return (
    <>
      <p className="menu-item heading">علامت گذاری</p>
      <Checkbox checked={highlight} onChange={(value) => handleOnToggle(value)}>
        علامت گذاری واژه جستجو شده
      </Checkbox>
      {highlight && "تغییر رنگ هایلایت"}
    </>
  );
}
