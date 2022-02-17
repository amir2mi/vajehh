import Icons from "../Icons";
import IntroBox from "../IntroBox";

export default function NoResult() {
  return (
    <IntroBox className="horizontal" title="چیزی پیدا نشد" icon={<Icons.NoResult />}/>
  );
}
