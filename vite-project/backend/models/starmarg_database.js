const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Image schema
const imageSchema = new mongoose.Schema({
  uuid: { type: String, default: uuidv4 },
  name: { type: String, required: true }, 
  base64: { type: String },                
  driveLink: { type: String },         
});

// Imageset schema
const imagesetSchema = new mongoose.Schema({
  folderName: { type: String, required: true, unique: true },
  image: [imageSchema],
  createdAt: { type: Date, default: Date.now },
});

// Subfolder schema
const subfolderSchema = new mongoose.Schema({
  folderName: { type: String, required: true, unique: true },
  imagesets: [imagesetSchema],
  createdAt: { type: Date, default: Date.now },
});

// Folder schema
const folderSchema = new mongoose.Schema({
  folderName: { type: String, required: true, unique: true },
  subFolders: [subfolderSchema],
  createdAt: { type: Date, default: Date.now },
});

// Main schema for multiple users
const formultipleuser = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  folders: [folderSchema],
});

module.exports = mongoose.model('starmarg_database', formultipleuser);
