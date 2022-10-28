import clsx from "clsx";
import { ItemsGroup, ToggleSwitch } from "react-flatifycss";
import { useSettings } from "../../contexts/settings";
import { setLocalStorageProp } from "../../utils/localStorage";

const highlightPalette = [
  {
    title: "زرد",
    value: "yellow",
    className: "yellow",
    activeClassName: "active",
  },
  {
    title: "آبی",
    value: "blue",
    className: "blue",
    activeClassName: "active",
  },
  {
    title: "سبز",
    value: "green",
    className: "green",
    activeClassName: "active",
  },
  {
    title: "قرمز",
    value: "red",
    className: "red",
    activeClassName: "active",
  },
  {
    title: "صورتی",
    value: "pink",
    className: "pink",
    activeClassName: "active",
  },
  {
    title: "بنفش",
    value: "purple",
    className: "purple",
    activeClassName: "active",
  },
];

export default function HighlightSettings() {
  const { highlight, setHighlight, highlightColor, setHighlightColor } = useSettings();

  const handleOnToggle = (value: boolean) => {
    setHighlight(value);
    setLocalStorageProp("settings", "highlight", value);
  };

  const handleOnColorChange = (value) => {
    setHighlightColor(value);
    setLocalStorageProp("settings", "highlightColor", value);
  };

  return (
    <>
      <p id="highlight-settings-label" className="menu-item heading">
        تنظیمات علامت‌گذاری
      </p>
      <div aria-labelledby="highlight-settings-label">
        <ToggleSwitch checked={highlight} isAfterLabel={true} onChange={(e, value) => handleOnToggle(value)}>
          علامت‌گذاری واژه جستجو شده
        </ToggleSwitch>
        <div className={clsx("change-highlight-color", !highlight && "disable-layer")}>
          <p id="highlight-color-label" className="settings-label">
            رنگ علامت‌گذاری
          </p>
          <ItemsGroup
            aria-labelledby="highlight-color-label"
            className="highlight-colors"
            items={highlightPalette}
            value={highlightColor}
            onChange={(value) => handleOnColorChange(value)}
          />
        </div>
      </div>
    </>
  );
}
