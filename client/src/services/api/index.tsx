import axios from "axios";

const apiEndPoint = "http://localhost:8080/api";

type Dictionaries = "motaradef" | "sereh" | "teyfi" | "farhangestan" | "ganjvar";

export async function searchWord(dic: Dictionaries, word: string) {
  word = word.trim();

  if (word.length < 2) return { data: [] };

  try {
    const { data } = await axios.get(`${apiEndPoint}/${dic}/${word}`);
    return data;
  } catch (e) {
    console.error(e);
  }
}
