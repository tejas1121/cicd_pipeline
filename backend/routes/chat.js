const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.1-8b-instant"
    });

    const aiResponse = completion.choices[0].message.content;

    const summary = aiResponse.split(".").slice(0,2).join(".") + ".";

    res.json({
      reply: summary
    });

  } catch (error) {

    console.error(error);

    res.json({
      reply: "AI error occurred"
    });

  }

});

module.exports = router;