const express = require("express");
const motaradefDatabase = require("../database/motaradef.json");
const searcher = require("../searcher");

const router = express.Router();

// return result based on the given string
router.get("/:word", (req, res) => {
  const { word } = req.params;
  const { type } = req.query;
  const result = searcher(motaradefDatabase, word, type ? type : "weak");
  res.send(result);
});

module.exports = router;
