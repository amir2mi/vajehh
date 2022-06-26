const express = require("express");
const searchWord = require("../searcher");
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

module.exports = router;
