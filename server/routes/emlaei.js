const express = require("express");

const path = require("path");
var dictionary = require("dictionary-fa");
var nspell = require("nspell");
const router = express.Router();


// return result based on the given string
router.get("/:word", (req, res) => {
  const { word } = req.params;

  dictionary((err, dict) => {
    if (err) {
      throw err;
    }

    const spell = nspell(dict);
    const result = spell.suggest(word);
  
    res.send(result);
  });
});

module.exports = router;
