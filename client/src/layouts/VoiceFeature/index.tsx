import { useNavigate } from "react-router-dom";
import { Info } from "@components";
import Icons from "@components/Icons";

import "./style.scss";
import { Button } from "react-flatifycss";

export default function VoiceFeature() {
  const navigate = useNavigate();

  return (
    <div className="voice-feature">
      <div className="voice-info flex-center">
        <div className="voice-icon">
          <Icons.Microphone className="microphone" />
          <Icons.AudioWaves className="waves" />
        </div>
        <Info title="تلفظ واژگان فارسی" subtitle="تلفظ واقعی واژگان فارسی ضبط‌شده توسط کاربران فارسی‌زبان" />
      </div>
      <div className="call-to-action">
        <Button onClick={() => navigate("/support")}>منبع تلفظ فارسی</Button>
      </div>
    </div>
  );
}
