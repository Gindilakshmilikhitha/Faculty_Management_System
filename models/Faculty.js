const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
  Id: Number,
  Name: String,
  Subject: String,
  SubjectCode: String
});

// "fac" is your existing MongoDB collection name
module.exports = mongoose.model("Faculty", FacultySchema, "fac");