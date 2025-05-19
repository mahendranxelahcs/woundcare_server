// controllers/authController.js
const bcrypt = require("bcryptjs");
const { poolConnect, sql, pool } = require("../config/db.js");

exports.registerUser = async (req, res) => {
  const { email, password, isTermsAccepted, isAnonymized, emailNotifications } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    await poolConnect;

    const existingUser = await pool.request()
      .input("email", sql.NVarChar(255), email)
      .query("SELECT * FROM Users WHERE Email = @email");

    if (existingUser.recordset.length > 0) {
      return res.status(409).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.request()
      .input("email", sql.NVarChar(255), email)
      .input("passwordHash", sql.NVarChar(255), hashedPassword)
      .input("authProvider", sql.NVarChar(50), "local")
      .query(`
        INSERT INTO Users (
          Email, PasswordHash, AuthProvider,
          CreatedOn, ModifiedOn
        )
        VALUES (
          @email, @passwordHash, @authProvider,
          GETDATE(), GETDATE()
        )
      `);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login API Clicked");

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    await poolConnect;
    console.log("Login with email: ", email);
    const result = await pool.request()
      .input("email", sql.NVarChar(255), email)
      .query("SELECT * FROM Users WHERE Email = @email");

    const user = result.recordset[0];

    if (!user) {
      console.log("User Not Exisitng !");
      return res.status(401).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    res.status(200).json({ message: "Login successful", email: user.Email });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
