function getLocalStorage(key: string, initialValue?: unknown) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    return initialValue;
  }
}

function setLocalStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error({ e });
  }
}

function setLocalStorageProp(key: string, prop: string, value: unknown) {
  // get given key data if it was empty use current prop and value as the initial data
  const settings = getLocalStorage(key, { [prop]: value });
  // update the prop
  settings[prop] = value;

  // save to local storage
  setLocalStorage(key, settings);
}

export { getLocalStorage, setLocalStorage, setLocalStorageProp };
