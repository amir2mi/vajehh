const express = require("express");
const teyfiDatabase = require("../database/teyfi.json");
const searcher = require("../searcher");

const router = express.Router();

// return database
router.get("/", (req, res) => {
  res.send(teyfiDatabase);
});

// return result based on the given string
router.get("/:word", (req, res) => {
  const result = searcher(teyfiDatabase, req.params.word);
  res.send(result);
});

module.exports = router;
