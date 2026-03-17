const router = require("express").Router();
const Faculty = require("../models/Faculty");

// ➕ Add Faculty
// ➕ Add Faculty (Id must be unique)
// ➕ Add Faculty
router.post("/add", async (req, res) => {
  const { Id, Name, Subject, SubjectCode } = req.body;

  const existing = await Faculty.findOne({ Id });

  if (existing) {
    return res.json({ message: "🚫 IDs must be unique. Use a different ID." });
  }

  const faculty = new Faculty({ Id, Name, Subject, SubjectCode });
  await faculty.save();

  res.json({ message: "✅ Faculty added successfully" });
});

// 📄 Get All Faculty
router.get("/all", async (req, res) => {
  const data = await Faculty.find();
  res.json(data);
});

// ✏️ Update Faculty
router.put("/update/:id", async (req, res) => {
  const originalId = req.params.id;
  const { Id, Name, Subject, SubjectCode } = req.body;

  const faculty = await Faculty.findOne({ Id: originalId });

  if (!faculty) {
    return res.json({ message: "❌ Faculty not found" });
  }

  // Prevent ID change
  if (Id && Id != originalId) {
    return res.json({ message: "🚫 IDs can't be changed." });
  }

  // No changes detected
  if (
    faculty.Name === Name &&
    faculty.Subject === Subject &&
    faculty.SubjectCode === SubjectCode
  ) {
    return res.json({ message: "⚠️ No changes are made." });
  }

  // Perform update
  await Faculty.updateOne(
    { Id: originalId },
    { $set: { Name, Subject, SubjectCode } }
  );

  res.json({ message: "✅ Faculty updated successfully" });
});

// 🗑 Delete Faculty
router.delete("/delete/:id", async (req, res) => {
  await Faculty.deleteOne({ Id: req.params.id });
  res.json({ message: "Faculty deleted" });
});

module.exports = router;