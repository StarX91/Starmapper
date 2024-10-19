const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  image: [{
    name: { type: String, required: true },   // Name of the image
    data: { type: String },                    // Base64 string or URL
    driveLink: { type: String }                // Optional Google Drive link
  }]
});

const images_starstork = mongoose.model('images_starstork', imageSchema);

module.exports = images_starstork;
