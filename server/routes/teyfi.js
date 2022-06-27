const express = require("express");
const searchWord = require("../searcher");
const renderSearchImage = require("../utils/render-search-image");
const router = express.Router();

router.get("/:word", async (req, res) => {
  const { word } = req.params;
  const { fuzzy } = req.query;
  const isFuzzy = String(fuzzy).toLowerCase() === "true";
  const database = req.app.locals.firstDatabase;

  // only search if the database is connected
  if (!database) return res.status(500).send("Database is not connected");

  try {
    const result = await searchWord(database, "teyfi", word, 100, isFuzzy);
    return res.send({
      kind: "teyfi",
      items: result,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/image/:word", async (req, res) => {
  const { word } = req.params;
  const database = req.app.locals.firstDatabase;

  // only search if the database is connected
  if (!database) return res.status(500).send("Database is not connected");

  try {
    const result = await searchWord(database, "teyfi", word, 1, false);

    if (result.length === 0)
      return res.status(404).send({
        kind: "teyfi:image",
        url: "",
        message: `Could not find any definition related to [${word}] to create the image`,
      });

    const imageDataUrl = await renderSearchImage(result[0], {
      primaryColor: "#FFE749",
      linesCount: 8,
      linesOrdinalMargin: true,
    });

    return res.send({
      kind: "teyfi:image",
      url: imageDataUrl,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
