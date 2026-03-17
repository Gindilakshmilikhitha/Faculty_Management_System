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
mongoose.connect("mongodb+srv://LikithaGindi:Likitha123@facultymanagementsystem.dg0ln4q.mongodb.net/CSM?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});