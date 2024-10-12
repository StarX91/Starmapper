const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile_img: { type: String, default: "" },
    password: { type: String, required: true }, // Add password field
  },
  { timestamps: true }
);

const register = mongoose.model("register", userSchema);

module.exports = register;
