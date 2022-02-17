import Icons from "../Icons";
import IntroBox from "../IntroBox";

export default function NoResult() {
  return (
    <IntroBox className="horizontal" title="موردی پیدا نشد" icon={<Icons.NoResult />}/>
  );
}
