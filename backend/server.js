require("dotenv").config();

const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chat");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("AI Chatbot Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});