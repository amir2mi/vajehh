const express = require("express");
const searchWord = require("../searcher");
const router = express.Router();

router.get("/:word", async (req, res) => {
  const { word } = req.params;
  const { fuzzy } = req.query;
  const isFuzzy = String(fuzzy).toLowerCase() === "true";
  const database = req.app.locals.firstDatabase;

  // only search if the database is connected
  if (!database) return res.status(500).send("Database is not connected");

  try {
    const result = await searchWord(database, "motaradef", word, 100, isFuzzy);
    return res.send({
      kind: "motaradef",
      items: result,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
