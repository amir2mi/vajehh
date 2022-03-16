import axios from "axios";
import config from "../../config.json";
import { AllowedDictionaries } from "../../contexts/dictionary";

export async function searchWord(dic: AllowedDictionaries, word: string, fuzzy?: boolean) {
  // remove all slashes from the given string to prevent server-side errors
  word = word.replace(/\//g, "");
  // Use real API when it is in production mode
  const endPoint: string = process.env.NODE_ENV !== "production" ? config.apiEndpointURL__dev : config.apiEndpointURL;
  return axios.get(`${endPoint}/${dic}/${word}${fuzzy ? "?fuzzy=true" : ""}`,);
}
