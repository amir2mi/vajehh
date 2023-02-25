const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt, options, type = "standard" } = req.body;
  const openai = req.app.locals.openai;

  try {
    const response = await openai?.createCompletion(options || { ...getTypeOptions(type), prompt });
    return res.send({
      type,
      result: response?.data?.choices?.[0]?.text || "",
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

function getTypeOptions(type) {
  switch (type) {
    case "standard":
      return {
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };
    case "summerize":
      return {
        model: "text-davinci-003",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };
    case "question-answer":
      return {
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };
    case "translator":
      return {
        model: "text-davinci-003",
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };
    case "chat":
      return {
        model: "text-davinci-003",
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      };
  }
}

module.exports = router;
