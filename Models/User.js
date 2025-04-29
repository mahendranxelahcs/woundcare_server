const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: String,
  EmailId: { type: String, unique: true },
  Password: String,
  Status: Number,
  CreatedOn: Date,
  CreatedBy: String,
});

const User = mongoose.model("users", UserSchema);  // ⚠️ MongoDB may change this to 'users'
module.exports = User;
