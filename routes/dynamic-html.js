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
    "برای استفاده و واژه و جستجو می‌توانید از صفحه در بخش جستجو واژه موردنظر را تایپ کنید",
    url
  );
  res.send(data);
});

router.get("/search/:word", async function (req, res) {
  const url = await getRequestUrl(req);
  const data = await dynamizeHTML(
    staticFile,
    `واژه | نتایج جستجو برای ${req.params.word}`,
    `مشاهده واژگان مترادف و متضاد، طیف واژه، معادل سره و فرهنگستان و اشعار مرتبط با واژه جستجو شده`,
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
