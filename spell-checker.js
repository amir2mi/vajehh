const spellChecker = require("simple-spellchecker");
const path = require("path");

function checkSpell(word, limit = 3) {
  return new Promise((resolve, reject) => {
    spellChecker.getDictionary("fa_IR", path.dirname(__dirname) + "/server/dict", async function (err, dictionary) {
      if (err) reject(err);

      let suggestions = await dictionary.getSuggestions(word, limit);

      if (suggestions) {
        // 1. remove \r char
        // 2. remove given word from suggestions
        suggestions = [...suggestions.map((value) => value.replace("\r", "")).filter((value) => value !== word)];
      }

      resolve(suggestions);
    });
  });
}

module.exports = checkSpell;
