import detectLang from "lang-detector";

export interface CheckIsCodeSnippetResultProps {
  isCode: boolean;
  language: null | string;
}

export default function checkIsCodeSnippet(text: string) {
  const result: CheckIsCodeSnippetResultProps = {
    isCode: false,
    language: null,
  };

  const detectedLanguage = detectLang(text, { statistics: true });

  if (detectedLanguage.detected !== "Unknown") {
    const mostRated = Object.keys(detectedLanguage.statistics).find((key) => detectedLanguage.statistics[key] > 4);

    if (mostRated) {
      result.isCode = true;
      result.language = mostRated;
    }
  }

  return result;
}
