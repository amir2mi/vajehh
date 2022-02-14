function setLocalStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error({ e });
  }
}

function getLocalStorage(key: string, initialValue?: any) {
  try {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    } else {
      const data = JSON.parse(JSON.stringify(initialValue));
      console.log(data);
      
      // set initial value to the local storage
      setLocalStorage(key, data);
      return data;
    }
  } catch (e) {
    return initialValue;
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
