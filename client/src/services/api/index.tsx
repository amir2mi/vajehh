import axios from "axios";
import config from "../../config.json";
import { AllowedDictionaries } from "../../contexts/dictionary";

export async function searchWord(dic: AllowedDictionaries, word: string, fuzzy?: boolean) {
  // remove all slashes from the given string to prevent server-side errors
  word = word.replace(/\//g, "");
  return axios.get(`${config.apiEndpointURL}/${dic}/${word}${fuzzy ? "?fuzzy=true" : ""}`);
}
