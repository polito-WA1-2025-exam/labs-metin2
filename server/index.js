const express = require("express");
const cors = require("cors");
const passport = require("passport");

const app = express();
const PORT = 3001;

// enable CORS for requests from 5173
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // parse JSON bodies

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.get("/api/establishments", async (req, res) => {
  try {
    const dummyData = [
      { id: 1, name: "Store One", phone: "555-1234" },
      { id: 2, name: "Restaurant ABC", phone: "555-9876" },
    ];
    res.json(dummyData);
  } catch (error) {
    console.error("Error fetching establishment data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
