import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "react-flatifycss";

export default function HeaderInfo() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const handleOnSubmit = () => {
    navigate(`search/${search}`);
  };

  return (
    <div className="header-info">
      <h1 className="title">جستجو در میان هزاران واژه</h1>
      <p className="subtitle">واژه، رفیق نویسندگان خلاق</p>
      <form onSubmit={() => handleOnSubmit()}>
        <Input
          type="text"
          wrapperClassName="search-bar"
          placeholder="جستجو واژه"
          value={search}
          onChange={(value) => setSearch(value)}
        >
          <button className="search-button" aria-label="جستجو کن"></button>
        </Input>
      </form>
    </div>
  );
}
