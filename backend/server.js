require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const chatRoutes = require("./routes/chat");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("AI Chatbot Backend Running");
});

/* Health check for Docker / cloud */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});