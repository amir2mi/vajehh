import { Button } from "react-flatifycss";
import { useTheme } from "../../contexts/theme";
import { setLocalStorageProp } from "../../utils/localStorage";
import Icons from "../Icons";

export default function NightModeButton() {
  const { nightMode, setNightMode } = useTheme();

  const themeLabel = (value) => {
    switch (value) {
      case "auto":
        return "خودکار";
      case true:
        return "شب";
      case false:
        return "روز";
    }
  };

  const handleOnNightModeChange = () => {
    switch (nightMode) {
      case true:
        setNightMode("auto");
        setLocalStorageProp("theme", "nightMode", "auto");
        break;
      case false:
        setNightMode(true);
        setLocalStorageProp("theme", "nightMode", true);
        break;
      default:
        setNightMode(false);
        setLocalStorageProp("theme", "nightMode", false);
        break;
    }
  };

  return (
    <Button
      className="toggle-nightmode"
      size="xs"
      aria-label={`تم فعلی: ${themeLabel(nightMode)}`}
      onClick={() => handleOnNightModeChange()}
    >
      {nightMode === "auto" && <Icons.AutoLight className="anim-fade-in" />}
      {nightMode === true && <Icons.Moon className="anim-fade-in" />}
      {nightMode === false && <Icons.Sun className="anim-fade-in" />}
    </Button>
  );
}
