const express = require("express");
const { registerFont, createCanvas, loadImage } = require("canvas");
const searchWord = require("../searcher");
const path = require("path");
const router = express.Router();

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
    ctx.drawImage(ferdowsiRetroImage, -30, 245, 240, 310);

    let title = result[0].title.slice(0, 19);
    title = result[0].title > 19 ? title + "…" : title;
    let description = result[0].definition;

    // draw the word
    ctx.font = '52px "Vazir"';
    ctx.textAlign = "right";
    ctx.fillStyle = "#5EC7F8";
    ctx.fillText(title, canvas.width - 25, 65);

    ctx.font = '24px "Vazir"';
    description.forEach((def, i) => {
      ctx.fillText(def, canvas.width - 25, 120 + i * 40);
    });

    const dataUrl = canvas.toDataURL("image/jpeg", "fast");

    res.writeHead(200, {
      "Content-Type": "image/jpeg",
    });
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
