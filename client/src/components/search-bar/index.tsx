import { Input } from "react-flatifycss";

export default function SearchBar() {
  const handleOnChange = (value: string) => {
    console.log(value);
  };

  return (
    <Input autoFocus type="text" size="lg" wrapperClassName="search-bar" onChange={(value) => handleOnChange(value)}>
      <button className="search-button size-lg" aria-label="جستجو واژه"></button>
    </Input>
  );
}
