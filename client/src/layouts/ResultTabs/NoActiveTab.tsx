import { Icons, IntroBox } from "@components";

export default function NoActiveTab() {
  return (
    <div className="tabs-wrapper bordered result-tabs no-active-tab flex-column-center">
      <IntroBox className="horizontal anim-fade-in" title="بدون منابع جستجو" icon={<Icons.NoActiveDict />}>
        هیچ زبانه جستجویی فعال نیست، از قسمت منابع جستجو حداقل یک مورد را فعال کنید.
      </IntroBox>
    </div>
  );
}
