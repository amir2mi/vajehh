const express = require("express");
const { registerFont, createCanvas, loadImage } = require("canvas");
const searchWord = require("../searcher");
const path = require("path");
const router = express.Router();

function canvasRoundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  return ctx;
}

router.get("/:word", async (req, res) => {
  const { word } = req.params;
  const { fuzzy } = req.query;
  const isFuzzy = String(fuzzy).toLowerCase() === "true";
  const database = req.app.locals.secondDatabase;

  // only search if the database is connected
  if (!database) return res.status(500).send("Database is not connected");

  try {
    const result = await searchWord(database, "dehkhoda", word, 100, isFuzzy);
    return res.send({
      kind: "dehkhoda",
      items: result,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/image/:word", async (req, res) => {
  const { word } = req.params;
  const database = req.app.locals.secondDatabase;

  registerFont(path.resolve(__dirname, "../assets/fonts/Vazir-Regular.ttf"), { family: "Vazir" });

  // only search if the database is connected
  if (!database) return res.status(500).send("Database is not connected");

  try {
    const result = await searchWord(database, "dehkhoda", word, 1, false);
    if (result.length === 0)
      return res.status(404).send({
        kind: "dehkhoda:image",
        url: "",
        message: "Could not find word to create the image",
      });

    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext("2d");

    // fill the canvas with background
    ctx.fillStyle = "#1e2a35";
    ctx.fillRect(0, 0, 512, 512);

    // draw the ferdowsi retro image
    const ferdowsiRetroPath = path.resolve(__dirname, "../assets/images/ferdowsi-retro.png");
    const ferdowsiRetroImage = await loadImage(ferdowsiRetroPath);
    ctx.drawImage(ferdowsiRetroImage, -30, 300, 200, 250);

    let title = result[0].title.length > 19 ? result[0].title.slice(0, 19) + "…" : result[0].title;
    let description = result[0].definition;

    // draw the word
    ctx.font = '52px "Vazir"';
    ctx.textAlign = "right";
    ctx.fillStyle = "#5EC7F8";
    ctx.fillText(title, canvas.width - 25, 65);

    ctx.font = '18px "Vazir"';
    description.slice(0, 5).forEach((def, i) => {
      def = def.length > 68 ? def.slice(0, 68) + "…" : def;

      ctx.fillText(def, canvas.width - 25, 120 + i * 40, 475);
    });

    // vajehh description
    ctx.font = '24px "Vazir"';
    ctx.fillText("موتور جستجوی نویسندگان", canvas.width - 25, 485);

    // vajehh website url
    canvasRoundRect(ctx, 340, 410, 150, 40, 12);
    ctx.fill();
    ctx.fillStyle = "#1e2a35";
    ctx.font = 'bold 18px "Roboto"';
    ctx.fillText("vajehh.com", 474, 436);

    const dataUrl = canvas.toDataURL("image/jpeg", "fast");

    return res.end(canvas.toBuffer("image/jpeg"));

    // res.send({
    //   kind: "dehkhoda:image",
    //   url: dataUrl,
    // });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
