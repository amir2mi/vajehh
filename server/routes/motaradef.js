const express = require("express");
const searchWord = require("../searcher");
const router = express.Router();

router.get("/:value", async (req, res) => {
  const { value } = req.params;
  const database = req.app.locals.firstDatabase;

  // only search if the database is connected
  if (!database) return res.status(500).send("Database is not connected");

  try {
    const result = await searchWord(database, "motaradef", value);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
