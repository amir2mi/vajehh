/**
 * @description set data to local storage
 */
function setLocalStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error({ e });
  }
}
/**
 * @description get data from local storage
 */
function getLocalStorage(key: string, initialValue?: any) {
  try {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    } else {
      const data = JSON.parse(JSON.stringify(initialValue));

      // set initial value to the local storage
      setLocalStorage(key, data);
      return data;
    }
  } catch (e) {
    return initialValue;
  }
}

/**
 * @description just change specific prop from given key
 */
function setLocalStorageProp(key: string, prop: string, value: unknown) {
  // get given key data if it was empty use current prop and value as the initial data
  const settings = getLocalStorage(key, { [prop]: value });
  // update the prop
  settings[prop] = value;

  // save to local storage
  setLocalStorage(key, settings);
}

/**
 * @description set new data at the first place and limit the old data to the max length
 */
function cacheToLocalStorage(key: string, data: unknown, limit: number = 100) {
  const cache = getLocalStorage(key);

  // if the there is cached data, add new data at the first place and limit data to last 100 items
  // otherwise just add the data
  const newCache = cache ? [data, ...cache.slice(0, limit)] : [data];

  setLocalStorage(key, newCache);
}

export { getLocalStorage, setLocalStorage, setLocalStorageProp, cacheToLocalStorage };
