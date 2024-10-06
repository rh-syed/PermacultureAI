require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const OpenAIService = require("./openaiService");
const openAIService = new OpenAIService();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the Permaculture Expert Backend!");
});

app.get("/api/hello", (req, res) => {
  res.send("Hello from the Permaculture Expert Backend!");
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const reply = await openAIService.getResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error("Error processing chat with OpenAI:", error);
    res.status(500).json({ reply: "Error communicating with AI" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
