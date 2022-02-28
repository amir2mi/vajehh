import Icons from "../Icons";
import IntroBox from "../IntroBox";

export default function Error() {
  return <IntroBox className="no-result horizontal" title="مشکلی پیش آمده" icon={<Icons.Error />} />;
}
