import axios from "axios";
import config from "../../config.json";
import { AllowedDictionaries } from "../../contexts/dictionary";

export async function searchWord(dic: AllowedDictionaries, word: string, fuzzy?: boolean) {
  // remove all slashes from the given string to prevent server-side errors
  word = word.replace(/\//g, "");

  // Use real API when it is in production mode
  const endPoint: string = process.env.NODE_ENV !== "production" ? config.apiEndpointURL__dev : config.apiEndpointURL;
  // we use CORS anywhere proxy server to avoid CORS errors
  return axios.get(`${endPoint}/${dic}/${word}`, {
    params: {
      fuzzy: fuzzy ? "true" : "false",
    },
    headers: {
      Origin: config.apiOrigin,
      crossorigin: true,
    },
  });
}
