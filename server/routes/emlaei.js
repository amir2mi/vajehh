const express = require("express");
const Typo = require("typo-js");
const path = require("path");

const router = express.Router();

const dictionary = new Typo("fa_IR", false, false, { dictionaryPath: path.dirname(__dirname) + "/dictionaries" });

// return result based on the given string
router.get("/:word", (req, res) => {
  const { word } = req.params;

  var suggestion = dictionary.suggest(word);

  res.send(suggestion && suggestion);
});

module.exports = router;
