import { useState, useEffect } from "react";
import { Checkbox, Dropdown } from "react-flatifycss";
import config from "../../config.json";
import useDebounce from "../../hooks/useDebounce";
import { useDictionary, Dictionaries } from "../../contexts/dictionary";
import { setLocalStorage } from "../../utils/localStorage";
import "./style.scss";

export default function DictionaryPicker() {
  const { dictionaries, setDictionaries } = useDictionary();
  const [dictionariesInfo, setDictionariesInfo] = useState<Dictionaries>(dictionaries);

  const debouncedInfo = useDebounce(dictionariesInfo, config.dictionaryPickerDebounceDuration);

  useEffect(() => {
    setDictionaries(debouncedInfo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInfo]);

  const handleOnChange = (key: string, value: boolean) => {
    const newDictionaries = { ...dictionaries };
    newDictionaries[key].active = value;

    setDictionariesInfo(newDictionaries);

    // set current dictionaries to local storage for next time user opens the app
    setLocalStorage("dictionaries", newDictionaries);
  };

  return (
    <Dropdown
      className="dictionary-picker"
      autoClose="outside"
      size="xs"
      buttonLabel="منابع جستجو"
      buttonArrow={true}
      offsetY={12}
    >
      {Object.values(dictionaries).map(({ name, key, active }) => (
        <Checkbox key={key} checked={active} onChange={(value) => handleOnChange(key, value)}>
          {name}
        </Checkbox>
      ))}
    </Dropdown>
  );
}
