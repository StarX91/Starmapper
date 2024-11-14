const mongoose = require('mongoose');

// Image schema
const imageSchema = new mongoose.Schema({
image: [{
    name: { type: String, required: true },   // Name of the image
    base64: { type: String },                    // Base64 string or URL
    driveLink: { type: String }                // Optional Google Drive link
    }],
  createdAt: { type: Date, default: Date.now },
});

const imageSchemaname = new mongoose.Schema({
    folderName:{type:String , required : true ,unique: true},
    image:[imageSchema],
    createdAt: { type: Date, default: Date.now },
})
// Subfolder schema
const subfolderSchema = new mongoose.Schema({
  folderName: { type: String, required: true, unique: true }, 
  imagesets: [imageSchemaname],
  createdAt: { type: Date, default: Date.now },
});

// Folder schema
const folderSchema = new mongoose.Schema({
  folderName: { type: String, required: true, unique: true },
  subFolders: [subfolderSchema],
  createdAt: { type: Date, default: Date.now },
});

const formultipleuser = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  folders: [folderSchema],
})

module.exports = mongoose.model('starmarg_database', formultipleuser);
