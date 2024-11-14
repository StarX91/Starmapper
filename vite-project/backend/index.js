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
const starmargImages = require('./models/images_starmarg');
const starstorkImages = require('./models/images_starstork');
const starmarg_data = require('./models/starmarg_database');
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

// app.post('/upload-images/starmarg/:uid', async (req, res) => {
//   const { uid } = req.params;
//   const { images } = req.body;

//   try {
//     // Filter out any null or empty images
//     const savedImages = images
//       .filter(file => file.base64 || file.driveLink) 
//       .map(file => ({
//         name: file.name || 'Unnamed file',
//         data: file.base64 || null, 
//         driveLink: file.driveLink || null 
//       }));

//     if (savedImages.length === 0) {
//       return res.status(400).json({ message: 'No valid images to upload' });
//     }

//     const userImages = await starmargImages.findOne({ uid });

//     if (userImages) {
//       const updatedImages = await starmargImages.findOneAndUpdate(
//         { uid },
//         { $push: { image: { $each: savedImages } } }, 
//         { new: true } 
//       );
//       return res.status(200).json({ message: 'Images added successfully', images: updatedImages });
//     } else {
//       const newImages = new starmargImages({
//         uid,
//         image: savedImages
//       });
//       await newImages.save();
//       return res.status(200).json({ message: 'First image uploaded successfully', images: newImages });
//     }
//   } catch (error) {
//     console.error('Image upload failed:', error);
//     res.status(500).send('Image upload failed');
//   }
// });



// // Endpoint to get images for a specific user
// app.get('/get-images/starmarg/:uid', async (req, res) => {
//   const { uid } = req.params;

//   try {
//     const userImages = await starmargImages.findOne({ uid });
//     if (!userImages) {
//       return res.status(404).json({ images: [] });
//     }
//     return res.status(200).json({ images: userImages.image });
//   } catch (error) {
//     console.error('Error fetching images:', error);
//     return res.status(500).send('Error fetching images');
//   }
// });
//image uploading of the starstork
// app.post('/upload-images/starstork/:uid', async (req, res) => {
//   const { uid } = req.params;
//   const { images } = req.body;

//   try {
//     // Filter out any null or empty images
//     const savedImages = images
//       .filter(file => file.base64 || file.driveLink) 
//       .map(file => ({
//         name: file.name || 'Unnamed file',
//         data: file.base64 || null, 
//         driveLink: file.driveLink || null 
//       }));

//     if (savedImages.length === 0) {
//       return res.status(400).json({ message: 'No valid images to upload' });
//     }

//     const userImages = await starstorkImages.findOne({ uid });

//     if (userImages) {
//       const updatedImages = await starstorkImages.findOneAndUpdate(
//         { uid },
//         { $push: { image: { $each: savedImages } } }, 
//         { new: true } 
//       );
//       return res.status(200).json({ message: 'Images added successfully', images: updatedImages });
//     } else {
//       const newImages = new starstorkImages({
//         uid,
//         image: savedImages
//       });
//       await newImages.save();
//       return res.status(200).json({ message: 'First image uploaded successfully', images: newImages });
//     }
//   } catch (error) {
//     console.error('Image upload failed:', error);
//     res.status(500).send('Image upload failed');
//   }
// });



// // Endpoint to get images for a specific user
// app.get('/get-images/starstork/:uid', async (req, res) => {
//   const { uid } = req.params;

//   try {
//     const userImages = await starstorkImages.findOne({ uid });
//     if (!userImages) {
//       return res.status(404).json({ images: [] });
//     }
//     return res.status(200).json({ images: userImages.image });
//   } catch (error) {
//     console.error('Error fetching images:', error);
//     return res.status(500).send('Error fetching images');
//   }
// });

// Route to create a new project folder
app.post('/starmarg/createProject', async (req, res) => {
  const { uid, projectName } = req.body;

  try {
    let userFolders = await starmarg_data.findOne({ uid });

    if (!userFolders) {
      userFolders = new starmarg_data({
        uid,
        folders: [{ folderName: projectName }],
      });
      await userFolders.save();
      return res.status(201).json({ message: 'Folder created successfully' });
    } else {
      const folderExists = userFolders.folders.some(
        (folder) => folder.folderName === projectName
      );

      if (folderExists) {
        return res.status(409).json({ message: 'Folder already exists' });
      } else {
        userFolders.folders.push({ folderName: projectName });
        await userFolders.save();
        return res.status(201).json({ message: 'Folder created successfully' });
      }
    }
  } catch (error) {
    console.log(error); // Add this to check the exact error
    res.status(500).json({ message: 'Server error', error });
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

// Route to upload images to a specific imageset
app.post('/upload-images/starmarg/:uid', async (req, res) => {
  const { uid } = req.params;
  const { projectName, subfolderName, imagesetName, images } = req.body;

  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ message: 'No images provided' });
  }

  try {
    const userDoc = await starmarg_data.findOne({ uid });
    if (!userDoc) {
      return res.status(404).json({ message: 'User not found' });
    }

    const folder = userDoc.folders.find(f => f.folderName === projectName);
    if (!folder) {
      return res.status(404).json({ message: 'Project folder not found' });
    }

    const subfolder = folder.subFolders.find(sf => sf.folderName === subfolderName);
    if (!subfolder) {
      return res.status(404).json({ message: 'Subfolder not found' });
    }

    const imageset = subfolder.imagesets.find(imgSet => imgSet.folderName === imagesetName);
    if (!imageset) {
      return res.status(404).json({ message: 'Imageset not found' });
    }

    imageset.image.push(...images);

    await userDoc.save();

    res.status(200).json({ message: 'Images uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading images', error });
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

    // Return images from the found imageset
    res.status(200).json({ images: imageset.image });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
