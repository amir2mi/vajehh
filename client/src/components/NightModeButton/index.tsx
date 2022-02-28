import { Button } from "react-flatifycss";
import { useTheme } from "../../contexts/theme";
import { setLocalStorageProp } from "../../utils/localStorage";
import Icons from "../Icons";

export default function NightModeButton() {
  const { nightMode, setNightMode } = useTheme();

  const handleOnNightModeChange = () => {
    switch (nightMode) {
      case "auto":
        setNightMode(false);
        setLocalStorageProp("theme", "nightMode", false);
        break;
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
    }
  };

  return (
    <Button className="toggle-nightmode" roundness="circle" size="xs" onClick={() => handleOnNightModeChange()}>
      {nightMode === "auto" && <Icons.AutoLight className="anim-fade-in" />}
      {nightMode === true && <Icons.Moon className="anim-fade-in" />}
      {nightMode === false && <Icons.Sun className="anim-fade-in" />}
    </Button>
  );
}
