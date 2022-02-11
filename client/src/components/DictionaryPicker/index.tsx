import React from "react";
import { Checkbox, Dropdown } from "react-flatifycss";
import "./style.scss";

export default function DictionaryPicker() {
  return (
    <Dropdown className="dictionary-picker" autoClose="outside" size="xs" buttonLabel="منابع جستجو" buttonArrow={true}>
      <Checkbox checked={true}>طیفی</Checkbox>
      <Checkbox checked={true}>گنجوی</Checkbox>
      <Checkbox checked={false}>سره</Checkbox>
      <Checkbox checked={true}>فرهنگستان</Checkbox>
    </Dropdown>
  );
}
