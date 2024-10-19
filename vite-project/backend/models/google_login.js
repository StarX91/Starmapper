const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid : { type: String, required: true, unique: true },
  username : { type: String, required: true },
  email : { type: String, required: true, unique: true },
  profile_img : { type: String, default: '' },
  image : { type: String, default: ''}
}, { timestamps: true });

const Register = mongoose.model('google_login', userSchema);

module.exports = Register;
