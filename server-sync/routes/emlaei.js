const express = require("express");
var spellChecker = require("simple-spellchecker");
const path = require("path");

const router = express.Router();

// return result based on the given string
router.get("/:word", (req, res) => {
  const { word } = req.params;

  spellChecker.getDictionary("fa_IR", path.dirname(__dirname) + "/dict", function (err, dictionary) {
    if (err) throw new Error(err);

    let suggestions = dictionary.getSuggestions(word, 3);

    if (suggestions) {
      // 1. remove \r char
      // 2. remove given word from suggestions
      suggestions = [...suggestions.map((value) => value.replace("\r", "")).filter((value) => value !== word)];
    }

    res.send({
      kind: "dictionary:emlaei",
      type: "spellcheck",
      items: suggestions,
    });
  });
});

module.exports = router;
