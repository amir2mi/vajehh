import { ToggleSwitch } from "react-flatifycss";
import { useSettings } from "../../contexts/settings";
import { useDictionary } from "../../contexts/dictionary";
import { useSearch } from "../../contexts/search";
import { setLocalStorage, setLocalStorageProp } from "../../utils/localStorage";

export default function GeneralSettings() {
  const { autoSearch, setAutoSearch, fuzzySearch, setFuzzySearch, limitHeight, setLimitHeight } = useSettings();
  const { dictionaries, setDictionaries } = useDictionary();
  const { searchValue, setSearchValue } = useSearch();

  const handleAutoSearchToggle = (value: boolean) => {
    setAutoSearch(value);
    setLocalStorageProp("settings", "autoSearch", value);
  };

  const handleFuzzySearchToggle = (value: boolean) => {
    setFuzzySearch(value);
    setLocalStorageProp("settings", "fuzzySearch", value);

    // reset cached results on fuzzy search toggle
    setLocalStorage("cached_dehkhoda", {});
    setLocalStorage("cached_teyfi", {});
    setLocalStorage("cached_motaradef", {});
    setLocalStorage("cached_sereh", {});
    setLocalStorage("cached_farhangestan", {});
    setLocalStorage("cached_ganjvar", {});
  };

  const handleLimitHeightToggle = (value: boolean) => {
    setLimitHeight(value);
    setLocalStorageProp("settings", "limitHeight", value);

    // reset the search value to update results
    const oldValue = searchValue;
    setSearchValue("");
    setTimeout(() => {
      setSearchValue(oldValue);
    }, 100);
  };

  const handleOnEmlaeiToggle = (value: boolean) => {
    const newDictionaries = { ...dictionaries };
    newDictionaries.emlaei.active = value;

    setDictionaries(newDictionaries);
    setLocalStorage("dictionaries", newDictionaries);
  };

  return (
    <>
      <p id="general-settings-label" className="menu-item heading">
        تنظیمات عمومی
      </p>
      <div aria-labelledby="general-settings-label">
        <ToggleSwitch checked={autoSearch} isAfterLabel={true} onChange={(value) => handleAutoSearchToggle(value)}>
          <p>
            جستجو خودکار
            <p className="settings-description">پس از یک ثانیه توقف نوشتن جستجو را شروع کن</p>
          </p>
        </ToggleSwitch>
        <ToggleSwitch checked={fuzzySearch} isAfterLabel={true} onChange={(value) => handleFuzzySearchToggle(value)}>
          <p>
            کشف واژگان مشابه
            <p className="settings-description">واژگانی که ساختاری مشابه ورودی دارند را در نظر بگیر</p>
          </p>
        </ToggleSwitch>
        <ToggleSwitch
          checked={dictionaries.emlaei.active}
          isAfterLabel={true}
          onChange={(value) => handleOnEmlaeiToggle(value)}
        >
          <p>
            پیشنهاد املایی
            <p className="settings-description">املا درست یا جایگزین واژگان را پیشنهاد بده</p>
          </p>
        </ToggleSwitch>
        <ToggleSwitch checked={limitHeight} isAfterLabel={true} onChange={(value) => handleLimitHeightToggle(value)}>
          <p>
            محدود کردن ارتفاع جعبه‌ها
            <p className="settings-description">محتوای طولانی را محدود و با کلیک نمایش بده</p>
          </p>
        </ToggleSwitch>
      </div>
    </>
  );
}
