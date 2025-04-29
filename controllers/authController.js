const User = require("../Models/User");
const bcrypt = require("bcryptjs");

exports.loginUser = async (req, res) => {
  const { EmailId, Password } = req.body;

  try {
    const user = await User.findOne({
      EmailId: new RegExp("^" + EmailId + "$", "i"),
    });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
