const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post("/", async (req, res) => {

  try {

    const { messages } = req.body;

    const completion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.1-8b-instant"
    });

    const reply = completion.choices[0].message.content;

    res.json({
      reply: reply
    });

  } catch (error) {

    console.error(error);

    res.json({
      reply: "AI error occurred"
    });

  }

});

module.exports = router;