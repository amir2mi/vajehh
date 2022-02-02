const express = require("express");
const serehDatabase = require("../database/sereh.json");
const searcher = require("../searcher");

const router = express.Router();

// return database
router.get("/", (req, res) => {
  res.send(serehDatabase);
});

// return result based on the given string
router.get("/:word", (req, res) => {
  const result = searcher(serehDatabase, req.params.word);
  res.send(result);
});

module.exports = router;
