const express = require("express");
const ganjvarDatabase = require("../database/ganjvar.json");
const searcher = require("../searcher");

const router = express.Router();

// return result based on the given string
router.get("/:word", (req, res) => {
  const { word } = req.params;
  const result = searcher(ganjvarDatabase, word, "weak", {
    findAllMatches: false,
    includeMatches: false,
    useExtendedSearch: false,
    threshold: 0.0,
    limit: 15,
  });
  res.send(result);
});

module.exports = router;
