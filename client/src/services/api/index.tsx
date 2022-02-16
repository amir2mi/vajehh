import axios from "axios";
import { AllowedDictionaries } from "../../contexts/search";

const apiEndPoint = "http://localhost:8080/api";

export async function searchWord(dic: AllowedDictionaries, word: string) {
  word = word.trim();

  if (word.length < 2) return { data: [] };

  try {
    const { data } = await axios.get(`${apiEndPoint}/${dic}/${word}`);
    return data;
  } catch (e) {
    console.error(e);
  }
}
