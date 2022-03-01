import axios from "axios";
import config from "../../config.json";
import { AllowedDictionaries } from "../../contexts/dictionary";

export async function searchWord(dic: AllowedDictionaries, word: string, fuzzy?: boolean) {
  word = word.trim();
  if (word.length < 2) return null;

  return axios.get(`${config.apiEndpoint}/${dic}/${word}${fuzzy ? "?fuzzy=true" : ""}`);
}
