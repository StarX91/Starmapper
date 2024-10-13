const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUserProfile,
  updateProfileImage,
} = require("../controllers/user.controller");

router.post("/register", registerUser);
router.get("/get-user", getUserProfile);
router.post("/update-profile-pic", updateProfileImage);
router.delete("/update-profile-pic", updateProfileImage);

module.exports = router;
