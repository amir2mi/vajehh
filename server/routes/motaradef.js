const express = require("express");
const searchWord = require("../searcher");
const sanitizeText = require("../sanitizer");
const router = express.Router();

router.get("/:word", async (req, res) => {
  const { word } = req.params;
  const { fuzzy } = req.query;
  const database = req.app.locals.firstDatabase;

  // only search if the database is connected
  if (!database) return res.status(500).send("Database is not connected");

  try {
    const result = await searchWord(database, "motaradef", sanitizeText(word), 100, fuzzy);
    res.send({
      kind: "motaradef",
      items: result,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
