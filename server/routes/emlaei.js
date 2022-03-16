const express = require("express");
const checkSpell = require("../spell-checker");

const router = express.Router();

// return result based on the given string
router.get("/:word", async (req, res) => {
  const { word } = req.params;
  const suggestions = await checkSpell(word);

  return res.send({
    kind: "emlaei",
    items: suggestions,
  });
});

module.exports = router;
