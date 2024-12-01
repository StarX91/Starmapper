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
const starmarg_data = require('./models/starmarg_database');
const starstork_data = require('./models/starstork_database');
const { v4: uuidv4 } = require('uuid');
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



mongoose.connect('mongodb+srv://starx91:Starx9119@starx91.ol9uz.mongodb.net/Starx?retryWrites=true&w=majority&appName=starx91', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Endpoint to register a new user
app.post('/register', async (req, res) => {
  const { uid, username, email, password, profile_img,verified } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Register({
      uid,
      username,
      email,
      profile_img,
      password: hashedPassword,
      verified
    });

    await newUser.save();
    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Error saving user');
  }
});

app.post('/register/verify', async (req, res) => {
  const { uid } = req.body;
  try {
    await Register.updateOne({ uid }, { verified: true });
    res.status(200).json({ message: "User verified successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error verifying user.", error });
  }
});


// Check if user exists by email
app.get('/register/check-user', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await Register.findOne({ email });
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

// to check whether email is verified or not
app.get('/login/verified', async (req, res) => {
  const { username } = req.query;  // username corresponds to the email in this case

  try {
    // Find the user by email
    const user = await Register.findOne({ email: username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the verification status
    res.status(200).json({ verified: user.verified });
  } catch (error) {
    console.error('Error fetching verified status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/update-password', async (req, res) => {
  const { email, newPassword } = req.body;
  
  try {
    // Hash the new password (use bcrypt or similar)
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in your database
    await Register.updateOne({ email }, { password: hashedPassword });

    res.status(200).send('Password updated successfully');
  } catch (error) {
    res.status(500).send('Error updating password');
  }
});


// Endpoint to handle Google sign-in
app.post('/google-signin', async (req, res) => {
  const { uid, username, email, profile_img, image } = req.body;

  try {
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
app.get('/google-signin/check-user', async (req, res) => {
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

//starmarg backend

// to create project
app.post('/starmarg/createProject', async (req, res) => {
  const { uid, projectName } = req.body;

  // Validate request body
  if (!uid || !projectName) {
    return res.status(400).json({ message: 'UID and Project Name are required' });
  }

  try {
    // Check if user exists in the database
    let userFolders = await starmarg_data.findOne({ uid });

    if (!userFolders) {
      // If UID not found, create a new entry
      userFolders = new starmarg_data({
        uid,
        folders: [{ folderName: projectName }],
      });
      await userFolders.save();
      return res.status(201).json({ message: 'Folder created successfully' });
    } else {
      // Check if folder already exists
      const folderExists = userFolders.folders.some(
        (folder) => folder.folderName === projectName
      );

      if (folderExists) {
        return res.status(409).json({ message: 'Folder already exists' });
      } else {
        // Add new folder to the user's folders
        userFolders.folders.push({ folderName: projectName });
        await userFolders.save();
        return res.status(201).json({ message: 'Folder created successfully' });
      }
    }
  } catch (error) {
    console.error('Error creating project folder:', error); // Improved logging
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message, // Provide error details for debugging
    });
  }
});


//for fetching the data
app.get('/starmarg/getProjects/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    const userFolders = await starmarg_data.findOne({ uid });

    if (userFolders) {
      return res.status(200).json({ projects: userFolders.folders });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

// route to create a subfolder
app.post('/starmarg/createSubfolder', async (req, res) => {
  const { uid, projectName, planName } = req.body;

  try {
    const userFolders = await starmarg_data.findOne({ uid });

    if (!userFolders) {
      return res.status(404).json({ message: 'User not found' });
    }

    const folder = userFolders.folders.find(f => f.folderName === projectName);
    if (!folder) {
      return res.status(404).json({ message: 'Project folder not found' });
    }

    const subfolderExists = folder.subFolders.some(sf => sf.folderName === planName);
    if (subfolderExists) {
      return res.status(409).json({ message: 'Subfolder already exists' });
    }

    folder.subFolders.push({ folderName: planName });
    await userFolders.save();

    return res.status(201).json({ message: 'Subfolder created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//routes to get the subfolder
app.get('/starmarg/getSubfolders', async (req, res) => {
  const { uid, projectName } = req.query;

  try {
    const user = await starmarg_data.findOne({ uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const project = user.folders.find((folder) => folder.folderName === projectName);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json(project.subFolders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



// Route to create an imageset
app.post('/starmarg/createImageset', async (req, res) => {
  const { uid, projectName, subfolderName, imagesetName } = req.body;

  try {
    const user = await starmarg_data.findOne({ uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const project = user.folders.find((folder) => folder.folderName === projectName);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const subfolder = project.subFolders.find((sf) => sf.folderName === subfolderName);
    if (!subfolder) return res.status(404).json({ message: 'Subfolder not found' });

    // Check for duplicate imageset name
    if (subfolder.imagesets.some((imageset) => imageset.folderName === imagesetName)) {
      return res.status(409).json({ message: 'Imageset name already exists' });
    }

    // Add the new imageset
    subfolder.imagesets.push({ folderName: imagesetName});
    await user.save();

    res.status(201).json({ message: 'Imageset created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



// Route for fetching the imagesets
app.get('/starmarg/getImagesets', async (req, res) => {
  const { uid, projectName, subfolderName } = req.query;

  try {
    const user = await starmarg_data.findOne({ uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const project = user.folders.find((folder) => folder.folderName === projectName);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const subfolder = project.subFolders.find((sf) => sf.folderName === subfolderName);
    if (!subfolder) return res.status(404).json({ message: 'Subfolder not found' });

    res.status(200).json(subfolder.imagesets); // Send the imagesets array directly
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// Route to update nested imageset array
app.post('/upload-images/starmarg/:uid', async (req, res) => {
  const { uid } = req.params;
  const { projectName, subfolderName, imagesetName, images } = req.body;

  // Validate the request body
  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ message: 'No images provided' });
  }

  try {
    // Generate UUID for each image and prepare them for saving
    const savedImages = images.map(img => ({
      uuid: uuidv4(), // Assign a unique identifier
      name: img.name || 'Unnamed Image',
      base64: img.base64 || null,
      driveLink: img.driveLink || null,
    }));

    // Update the nested imageset array directly using MongoDB's `$push` and `$each`
    const updatedDoc = await starmarg_data.findOneAndUpdate(
      {
        uid, // Find by user ID
        'folders.folderName': projectName, // Match the folder
        'folders.subFolders.folderName': subfolderName, // Match the subfolder
        'folders.subFolders.imagesets.folderName': imagesetName, // Match the imageset
      },
      {
        $push: {
          'folders.$[folder].subFolders.$[subfolder].imagesets.$[imageset].image': {
            $each: savedImages, // Add images with UUIDs
          },
        },
      },
      {
        arrayFilters: [
          { 'folder.folderName': projectName },
          { 'subfolder.folderName': subfolderName },
          { 'imageset.folderName': imagesetName },
        ],
        new: true, // Return the updated document
      }
    );

    // Check if the document was updated
    if (!updatedDoc) {
      return res.status(404).json({ message: 'Document or target imageset not found.' });
    }

    res.status(200).json({ message: 'Images uploaded successfully', updatedDoc });
  } catch (error) {
    console.error('Error updating images:', error);
    res.status(500).json({ message: 'Error updating images', error });
  }
});



// Route to fetch images from a specific imageset
app.get('/get-images/starmarg/:uid', async (req, res) => {
  const { uid } = req.params;
  const { projectName, subfolderName, imagesetName } = req.query;

  try {
    const user = await starmarg_data.findOne({ uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const project = user.folders.find((folder) => folder.folderName === projectName);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const subfolder = project.subFolders.find((sf) => sf.folderName === subfolderName);
    if (!subfolder) return res.status(404).json({ message: 'Subfolder not found' });

    const imageset = subfolder.imagesets.find((is) => is.folderName === imagesetName);
    if (!imageset) return res.status(404).json({ message: 'Imageset not found' });

    res.status(200).json({ images: imageset.image });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

//starstork

// Add or Update Project
app.post('/starstork/add_project', async (req, res) => {
  const { uid, projectName } = req.body;

  try {
    // Find the user by UID
    let user = await starstork_data.findOne({ uid });

    if (user) {
      // Check if the folder name already exists
      const folderExists = user.folders.some(
        (folder) => folder.folderName === projectName
      );

      if (folderExists) {
        return res.status(409).json({ message: 'Folder name already exists' });
      }

      // Add new folder
      user.folders.push({ folderName : projectName });
      await user.save();
      return res.status(201).json({ message: 'Folder added successfully' });
    } else {
      // Create new user with the folder
      user = new starstork_data({
        uid,
        folders: [{ folderName : projectName }],
      });
      await user.save();
      return res.status(201).json({ message: 'User and folder created successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to fetch folders for a specific user
app.get('/starstork/folders/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await starstork_data.findOne({ uid });
    if (user) {
      res.status(200).json({ projects: user.folders });
    } else {
      res.status(404).json({ message: 'No folders found for this user.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving folders.', error });
  }
});

// Rename Project Folder
app.put('/api/folders/rename', async (req, res) => {
  const { userId, oldFolderName, newFolderName } = req.body;

  try {
    // Find the user and project folder to rename
    const user = await starstork_data.findOne({ uid: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const project = user.folders.find(f => f.folderName === oldFolderName);

    if (!project) {
      return res.status(404).json({ message: 'Project folder not found' });
    }

    // Rename the folder
    project.folderName = newFolderName;

    await user.save();

    res.status(200).json({ message: 'Folder renamed successfully', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error renaming folder' });
  }
});

// Delete Project Folder
app.delete('/api/folders/delete', async (req, res) => {
  const { userId, folderName } = req.body;

  try {
    // Find the user
    const user = await starstork_data.findOne({ uid: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find and remove the project folder from the user's folders array
    const folderIndex = user.folders.findIndex(f => f.folderName === folderName);

    if (folderIndex === -1) {
      return res.status(404).json({ message: 'Project folder not found' });
    }

    // Remove the folder from the array
    user.folders.splice(folderIndex, 1);

    await user.save();

    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting folder' });
  }
});

// to get the imageset from starstork
app.get('/api/projects/:uid', async (req, res) => {
  try {
    const user = await starmarg_data.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Send back the user data
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});

// Upload Images to an ImageSet
app.post('/api/upload-image-set', async (req, res) => {
  try {
    const { uid, folderName, taskName, imageSetName, images } = req.body;

    if (!uid || !folderName || !taskName || !imageSetName || !images) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Find user by UID
    const user = await starstork_data.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Find the project
    const project = user.folders.find((folder) => folder.folderName === folderName);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Find the task
    const task = project.imagesets.find((task) => task.folderName === taskName);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    // Find the image set
    const imageSet = task.imagesets.find((set) => set.folderName === imageSetName);
    if (!imageSet) {
      return res.status(404).json({ message: 'Image set not found.' });
    }

    // Add images to the image set
    images.forEach((img) => {
      imageSet.image.push({
        uuid: uuidv4(),
        name: img.name,
        base64: img.base64,
      });
    });

    await user.save();
    res.status(200).json({ message: 'Images uploaded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
