const express = require("express");
const path = require("path");
const dynamizeHTML = require("../html-dynamizer");

const router = express.Router();

const staticDir = "../../client/build";
const staticFile = path.resolve(__dirname, staticDir, "index.html");

const getRequestUrl = (req) => {
  return new Promise((resolve) => {
    const url = req.protocol + "://" + req.get("host") + req.originalUrl;
    resolve(url);
  });
};

const handleWordSearchTitle = (activeTab, word) => {
  return new Promise((resolve) => {
    if (activeTab && word) {
      switch (activeTab) {
        case "dehkhoda":
          resolve(`واژه | معنی و تفسیر ${word} در لغت نامه دهخدا`);
          break;
        case "teyfi":
          resolve(`واژه | واژگان مشابه با ${word} در فرهنگ طیفی`);
          break;
        case "motaradef":
          resolve(`واژه | مترادف ${word}`);
          break;
        case "sereh":
          resolve(`واژه | معادل فارسی ${word} در فرهنگ سره`);
          break;
        case "farhangestan":
          resolve(`واژه | معادل تخصصی فارسی ${word} در فرهنگستان`);
          break;
        case "ganjvar":
          resolve(`واژه | اشعار و ابیات مرتبط با ${word}`);
          break;
      }
    } else {
      if (word) {
        resolve(`واژه | نتایج جستجو برای ${word}`);
      } else {
        resolve(`واژه | جستجوی واژه و اشعار در فرهنگ های سره، طیفی، گنجور و غیره`);
      }
    }
  });
};

router.get("/", async function (req, res) {
  const url = await getRequestUrl(req);
  const data = await dynamizeHTML(
    staticFile,
    "واژه | موتور جستجوی نویسندگان",
    "با واژه می‌تونی خیلی راحت و سریع بین فرهنگ‌های مختلف جستجو کنی و متن بهتری بنویسی.",
    url
  );
  res.send(data);
});

router.get("/help", async function (req, res) {
  const url = await getRequestUrl(req);
  const data = await dynamizeHTML(staticFile, "واژه | راهنما", "راهنمای استفاده از واژه به همراه نکات کاربردی", url);
  res.send(data);
});

router.get("/search", async function (req, res) {
  const url = await getRequestUrl(req);
  const data = await dynamizeHTML(
    staticFile,
    "واژه | جستجوی واژه و اشعار در فرهنگ های سره، طیفی، گنجور و غیره",
    "از بین فرهنگ و واژه نامه های مختلف شروع به جستجو کنید تا به واژه یا شعر موردنظرتان را پیدا نمایید.",
    url
  );
  res.send(data);
});

router.get("/search/:word", async function (req, res) {
  const url = await getRequestUrl(req);
  const { word } = req.params;
  const { tab } = req.query;

  const title = await handleWordSearchTitle(tab, word);
  const data = await dynamizeHTML(
    staticFile,
    title,
    `مشاهده معنی و تفسیر، واژگان مترادف و متضاد، طیف واژه، معادل سره و فرهنگستان و اشعار مرتبط با [${word}]`,
    url
  );
  res.send(data);
});

router.get("/support", async function (req, res) {
  const url = await getRequestUrl(req);
  const data = await dynamizeHTML(
    staticFile,
    "واژه | پشتیبانی",
    "نحوه دریافت پشتیبانی و برقراری ارتباط با توسعه‌دهنده واژه",
    url
  );
  res.send(data);
});

router.get("/404", async function (req, res) {
  const url = await getRequestUrl(req);
  const data = await dynamizeHTML(
    staticFile,
    "صفحه موردنظر پیدا نشد",
    "به آدرسی آمده‌اید که حذف یا تغییر پیدا کرده یا اینکه اشتباه است",
    url
  );
  res.send(data);
});

module.exports = router;
