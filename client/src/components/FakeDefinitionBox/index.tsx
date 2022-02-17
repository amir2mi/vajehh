import DefinitionBox from "../DefinitionBox";
import "./style.scss";

export default function FakeDefinitionBox() {
  return (
    <DefinitionBox
      className="fake-defintion-box"
      title="در حال جستجو"
      definition="واژه در حال جستجو بین واژه‌نامه ها است تا بتواند مناسب ترین پاسخ را برای شما به نمایش بگذارد."
      highlight={false}
    />
  );
}
