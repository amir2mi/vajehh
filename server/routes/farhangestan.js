const express = require("express");
const farhangDatabase = require("../database/farhangestan.json");
const searcher = require("../searcher");

const router = express.Router();

// return database
router.get("/", (req, res) => {
  res.send(farhangDatabase);
});

// return result based on the given string
router.get("/:word", (req, res) => {
  const { word } = req.params;
  const { type } = req.query;
  const result = searcher(farhangDatabase, word, type && type);
  res.send(result);
});

module.exports = router;
