const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.use("/auth", require("./routes/auth"));
app.use("/faculty", require("./routes/faculty"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/CSM")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});