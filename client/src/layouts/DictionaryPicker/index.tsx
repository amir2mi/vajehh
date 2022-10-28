import { useState, useEffect } from "react";
import { Checkbox, Dropdown, DropdownBody, DropdownButton } from "react-flatifycss";
import config from "../../config.json";
import useDebounce from "../../hooks/useDebounce";
import { useDictionary, Dictionaries } from "../../contexts/dictionary";
import { setLocalStorage } from "../../utils/localStorage";
import "./style.scss";

export default function DictionaryPicker() {
  const { dictionaries, setDictionaries } = useDictionary();
  const [dictionariesInfo, setDictionariesInfo] = useState<Dictionaries>(dictionaries);

  const debouncedInfo = useDebounce(dictionariesInfo, config.dictionaryPickerDebounceDuration);

  // these dictionaries should not be shown in the picker
  const dictionariesBlacklist = ["emlaei"];

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
    <Dropdown id="search-dictionaries" className="dictionary-picker" autoClose="outside" size="xs" offsetY={10}>
      <DropdownButton hasArrow>منابع جستجو</DropdownButton>
      <DropdownBody>
        {Object.values(dictionaries).map(
          ({ name, key, active }) =>
            !dictionariesBlacklist.includes(key) && (
              <Checkbox key={key} checked={active} onChange={(e, value) => handleOnChange(key, value)}>
                {name}
              </Checkbox>
            )
        )}
      </DropdownBody>
    </Dropdown>
  );
}
