const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const User = require('./models/google_login'); // Ensure this path is correct
const Register = require('./models/register');

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Optional: if you need to include cookies
}));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('uploads/')); // Specify where to save the files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  },
});
const upload = multer({ storage });
app.post('/upload', upload.array('files'), (req, res) => {
    console.log('Files uploaded:', req.files);
    res.send('Files uploaded successfully');
  });



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yourdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Endpoint to register a new user
app.post('/register', async (req, res) => {
  const { uid, username, email, password, profile_img } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Register({
      uid,
      username,
      email,
      profile_img,
      password: hashedPassword 
    });

    await newUser.save();
    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Error saving user');
  }
});

// Endpoint to handle Google sign-in
app.post('/google-signin', async (req, res) => {
  const { uid, username, email, profile_img, image } = req.body;

  try {
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(200).send('User already exists');
    }

    const newUser = new User({ uid, username, email, profile_img, image });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error saving Google user:', error);
    res.status(500).send('Error saving Google user');
  }
});

// Endpoint to get user profile by UID
app.get('/api/google_login/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Error fetching user profile');
  }
});

// Check if user exists by email
app.get('/check-user', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ exists: true, user });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking if user exists:', error);
    res.status(500).send('Server error');
  }
});

// Endpoint to update user profile image
app.post('/api/google_login/:uid', async (req, res) => {
  const { uid } = req.params;
  const { image } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { image },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('User image updated successfully');
  } catch (error) {
    console.error('Error updating user image:', error);
    res.status(500).send('Error updating user image');
  }
});

// Endpoint to delete user image
app.put('/api/google_login/:uid/delete-image', async (req, res) => {
  const { uid } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { profile_img: null, image: null },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('User image deleted successfully');
  } catch (error) {
    console.error('Error deleting user image:', error);
    res.status(500).send('Error deleting user image');
  }
});

// New endpoint to upload user image via Multer
app.post('/api/google_login/:uid/upload-image', upload.single('file'), async (req, res) => {
  const { uid } = req.params;

  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const imageUrl = `/uploads/${req.file.filename}`;

    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { image: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error uploading user image:', error);
    res.status(500).send('Error uploading user image');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
