import config from "@config.json";

async function shareIt(title: string, text?: string, url?: string) {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: text,
        url: url,
      })
      .catch(() => console.error("An error occurred during the share process."));
  } else {
    window.open(`https://twitter.com/intent/tweet?text=${title} - ${text}&url=${url}`, "_blank");
  }
}

const shareVajehh = () =>
  shareIt(
    "واژه - موتور جستجوی نویسندگان",
    "با واژه می‌تونی بصورت رایگان بین فرهنگ و واژه‌نامه‌های مختلف جستجو کنی و متن خلاقانه‌تری بنویسی.",
    config.websiteURL
  );

export { shareIt, shareVajehh };
