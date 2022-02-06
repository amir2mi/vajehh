const express = require("express");
const emlaeiDatabase = require("../database/emlaei.json");
const searcher = require("../searcher");

const router = express.Router();

// return database
router.get("/", (req, res) => {
  res.send(emlaeiDatabase);
});

// return result based on the given string
router.get("/:word", (req, res) => {
  const { word } = req.params;
  const { type } = req.query;
  const result = searcher(emlaeiDatabase, word, "exact", {
    threshold: 0.5,
    ignoreLocation: false,
    location: 0,
    distance: 1000,
    includeMatches: false,
  });
  res.send(result);
});

module.exports = router;
