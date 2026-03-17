const router = require("express").Router();

const USER = {
  name: "LakshmiLikhitha",
  email: "lakshmilikhithagindi@gmail.com",
  password: "120906"
};

router.post("/login", (req, res) => {
  const { name, email, password } = req.body;

  let wrongFields = [];

  if (name !== USER.name) wrongFields.push("username");
  if (email !== USER.email) wrongFields.push("email");
  if (password !== USER.password) wrongFields.push("password");

  // If there are errors
  if (wrongFields.length > 0) {
    // All wrong
    if (wrongFields.length === 3) {
      return res.json({
        success: false,
        message: "🚫 All credentials are incorrect"
      });
    }

    // Join fields: email and password, username and email, etc.
    const fieldText = wrongFields.join(" and ");

    return res.json({
      success: false,
      message: `⚠️ Incorrect ${fieldText}`
    });
  }

  // All correct
  res.json({
    success: true,
    message: "✅ Login successful"
  });
});

module.exports = router;
