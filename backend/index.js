const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const User = require("./models/googleLogin.models.js"); // Ensure this path is correct
const Register = require("./models/register.models.js");
const Images = require("./models/imagesStarmarg.models.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Optional: if you need to include cookies
  })
);

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("uploads/")); // Specify where to save the files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  },
});
const upload = multer({ storage });
app.post("/upload", upload.array("files"), (req, res) => {
  console.log("Files uploaded:", req.files);
  res.send("Files uploaded successfully");
});

mongoose
  .connect(
    "mongodb+srv://starx91:Starx9119@starx91.ol9uz.mongodb.net/Starx?retryWrites=true&w=majority&appName=starx91",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Endpoint to register a new user
app.post("/register", async (req, res) => {
  const { uid, username, email, password, profile_img } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Register({
      uid,
      username,
      email,
      profile_img,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).send("User registered successfully");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Error saving user");
  }
});

// Check if user exists by email
app.get("/register/check-user", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await Register.findOne({ email });
    if (user) {
      return res.status(200).json({ exists: true, user });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking if user exists:", error);
    res.status(500).send("Server error");
  }
});

app.post("/update-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Hash the new password (use bcrypt or similar)
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in your database
    await Register.updateOne({ email }, { password: hashedPassword });

    res.status(200).send("Password updated successfully");
  } catch (error) {
    res.status(500).send("Error updating password");
  }
});

// Endpoint to handle Google sign-in
app.post("/google-signin", async (req, res) => {
  const { uid, username, email, profile_img, image } = req.body;

  try {
    const newUser = new User({ uid, username, email, profile_img, image });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error saving Google user:", error);
    res.status(500).send("Error saving Google user");
  }
});

// Endpoint to get user profile by UID
app.get("/api/google_login/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Error fetching user profile");
  }
});

// Check if user exists by email
app.get("/google-signin/check-user", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ exists: true, user });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking if user exists:", error);
    res.status(500).send("Server error");
  }
});

// Endpoint to update user profile image
app.post("/api/google_login/:uid", async (req, res) => {
  const { uid } = req.params;
  const { image } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { image },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("User image updated successfully");
  } catch (error) {
    console.error("Error updating user image:", error);
    res.status(500).send("Error updating user image");
  }
});

// Endpoint to delete user image
app.put("/api/google_login/:uid/delete-image", async (req, res) => {
  const { uid } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { profile_img: null, image: null },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("User image deleted successfully");
  } catch (error) {
    console.error("Error deleting user image:", error);
    res.status(500).send("Error deleting user image");
  }
});

app.post("/upload-images/:uid", async (req, res) => {
  const { uid } = req.params;
  const { images } = req.body;

  try {
    // Filter out any null or empty images
    const savedImages = images
      .filter((file) => file.base64 || file.driveLink)
      .map((file) => ({
        name: file.name || "Unnamed file",
        data: file.base64 || null,
        driveLink: file.driveLink || null,
      }));

    if (savedImages.length === 0) {
      return res.status(400).json({ message: "No valid images to upload" });
    }

    const userImages = await Images.findOne({ uid });

    if (userImages) {
      const updatedImages = await Images.findOneAndUpdate(
        { uid },
        { $push: { image: { $each: savedImages } } },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Images added successfully", images: updatedImages });
    } else {
      const newImages = new Images({
        uid,
        image: savedImages,
      });
      await newImages.save();
      return res.status(200).json({
        message: "First image uploaded successfully",
        images: newImages,
      });
    }
  } catch (error) {
    console.error("Image upload failed:", error);
    res.status(500).send("Image upload failed");
  }
});

// Endpoint to get images for a specific user
app.get("/get-images/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const userImages = await Images.findOne({ uid });
    if (!userImages) {
      return res.status(404).json({ images: [] });
    }
    return res.status(200).json({ images: userImages.image });
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).send("Error fetching images");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
