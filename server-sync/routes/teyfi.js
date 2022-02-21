const express = require("express");
const teyfiDatabase = require("../database/teyfi.json");
const searcher = require("../searcher");

const router = express.Router();

// return result based on the given string
router.get("/:word", (req, res) => {
  const { word } = req.params;
  const {type} = req.query
  const result = searcher(teyfiDatabase, word, type ? type : "weak");
  res.send(result);
});

module.exports = router;
