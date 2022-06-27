const express = require("express");
const searchWord = require("../searcher");
const renderSearchImage = require("../utils/render-search-image");
const router = express.Router();

router.get("/:word", async (req, res) => {
  const { word } = req.params;
  const database = req.app.locals.secondDatabase;

  // only search if the database is connected
  if (!database) return res.status(500).send("Database is not connected");

  try {
    const result = await searchWord(database, "ganjvar", word, 100, false);
    return res.send({
      kind: "ganjvar",
      items: result,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/image/:word", async (req, res) => {
  const { word } = req.params;
  const database = req.app.locals.secondDatabase;

  // only search if the database is connected
  if (!database) return res.status(500).send("Database is not connected");

  try {
    const result = await searchWord(database, "ganjvar", word, 1, false);

    if (result.length === 0)
      return res.status(404).send({
        kind: "ganjvar:image",
        url: "",
        message: `Could not find any definition related to [${word}] to create the image`,
      });

    const imageDataUrl = await renderSearchImage(result[0], {
      primaryColor: "#ffc066",
      linesCount: 6,
      titleScale: "small",
    });

    return res.send({
      kind: "ganjvar:image",
      url: imageDataUrl,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
