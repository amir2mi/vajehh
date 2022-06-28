import axios from "axios";
import config from "../../config.json";
import { getLocalStorage } from "../../utils/localStorage";
import type { AllowedDictionaries } from "../../contexts/dictionary";

// Use real API when it is in production mode
const endPoint: string = process.env.NODE_ENV !== "production" ? config.apiEndpointURL__dev : config.apiEndpointURL;

export function searchWord(dic: AllowedDictionaries, word: string, fuzzy?: boolean) {
  const url = `${endPoint}/${dic}/${word}`;

  // remove all slashes from the given string to prevent server-side errors
  word = word.replace(/\//g, "");

  // get given dictionary last cached searches,
  // if the searched word is cached, return it.
  const localCache: Object = getLocalStorage(`cached_${dic}`);
  if (localCache && localCache.hasOwnProperty(word)) {
    return Promise.resolve({ data: { items: localCache[word] } });
  }

  return axios.get(url, {
    params: {
      fuzzy: fuzzy ? "true" : "false",
    },
  });
}

export function getWordImage(dic: AllowedDictionaries, word: string) {
  const url = `${endPoint}/${dic}/image/${word}`;

  // remove all slashes from the given string to prevent server-side errors
  word = word.replace(/\//g, "");
  // fo not search for empty string
  if (word.length === 0) return Promise.reject(new Error("Given word for image should not be empty."));

  return axios.get(url);
}

export function getDonations() {
  return axios.get(config.donationsListURL);
}
