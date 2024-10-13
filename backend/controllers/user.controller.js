const User = require("../models/user.model");

const registerUser = async (req, res, next) => {
  const { username, email, profile_img, image } = req.body;
  const uid = req.uid;

  try {
    const newUser = new User({
      uid,
      username,
      email,
      profile_img,
      image,
    });

    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully", status: "success" });
  } catch (error) {
    console.error("Error saving user:", error);
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  const { uid, email } = req.params;

  try {
    const query = {};
    if (uid) {
      query.uid = uid;
    } else if (email) {
      query.email = email;
    }
    const user = await User.findOne(query);
    if (user) {
      return res.status(200).json({ user, exists: true });
    } else {
      return res
        .status(204)
        .json({ message: "User not found.", exists: false });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    next(error);
  }
};

const updateProfileImage = async (req, res, next) => {
  const uid = req.uid;
  const { image } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { image },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ message: "User image updated successfully" });
  } catch (error) {
    console.error("Error updating user profile image:", error);
    next(error);
  }
};

const removeProfileImage = async (req, res, next) => {
  const uid = req.uid;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { image: "", profile_img: "" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ message: "User image removed successfully" });
  } catch (error) {
    console.error("Error updating user profile image:", error);
    next(error);
  }
};

module.exports = {
  registerUser,
  getUserProfile,
  updateProfileImage,
  removeProfileImage,
};
