const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/google_login'); // Ensure this path is correct
const Register = require('./models/register');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Optional: if you need to include cookies
}));

mongoose.connect('mongodb+srv://starx91:Starx9119@starx91.ol9uz.mongodb.net/Starx?retryWrites=true&w=majority&appName=starx91', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Endpoint to register a new user
// Endpoint to register a new user
app.post('/register', async (req, res) => {
    const { uid, username, email, password, profile_img } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user using the schema
        const newUser = new Register({
            uid,
            username,
            email,
            profile_img,
            password: hashedPassword // Save the hashed password
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
        // Check if the user already exists
        const existingUser = await User.findOne({ uid });
        if (existingUser) {
            return res.status(200).send('User already exists');
        }

        // Create new user
        const newUser = new User({ uid, username, email, profile_img ,image});
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
  
// Endpoint to update user profile
// Endpoint to update user profile image
app.post('/api/google_login/:uid', async (req, res) => {
    const { uid } = req.params;
    const { image } = req.body;

    try {
        // Find user by UID and update the image field
        const updatedUser = await User.findOneAndUpdate(
            { uid }, // Find user by UID
            { image: image }, // Update the image field with the new Base64 image
            { new: true } // Return the updated document
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


// Endpoint to delete user image (placeholder)
app.put('/api/google_login/:uid/delete-image', async (req, res) => {
    const { uid } = req.params;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { uid },
            { profile_img: null },
            { image : null},
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

// Endpoint to upload user image (placeholder)
app.post('/api/google_login/:uid/upload-image', async (req, res) => {
    const { uid } = req.params;

    // Assume image upload logic here, returning a sample URL
    const { image } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { uid },
            { image : image },
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
