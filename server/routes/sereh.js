const express = require("express");
const serehDatabase = require("../database/sereh.json");
const searcher = require("../searcher");

const router = express.Router();

// return result based on the given string
router.get("/:word", (req, res) => {
  const { word } = req.params;
  const { type } = req.query;
  const result = searcher(serehDatabase, word, type && type);
  res.send(result);
});

module.exports = router;
