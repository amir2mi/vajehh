import Icons from "../Icons";
import IntroBox from "../IntroBox";

export default function NoResult() {
  return (
    <IntroBox className="no-result horizontal" title="موردی پیدا نشد" icon={<Icons.NoResult />}/>
  );
}
