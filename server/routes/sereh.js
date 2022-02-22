const express = require("express");
const searchWord = require("../searcher");
const sanitizeText = require("../sanitizer");
const router = express.Router();

router.get("/:word", async (req, res) => {
  const { word } = req.params;
  const database = req.app.locals.firstDatabase;

  // only search if the database is connected
  if (!database) return res.status(500).send("Database is not connected");

  try {
    const result = await searchWord(database, "sereh", sanitizeText(word));
    res.send({
      kind: "sereh",
      items: result,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
