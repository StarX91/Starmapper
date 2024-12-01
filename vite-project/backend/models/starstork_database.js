const mongoose = require('mongoose');
const { v4 : uuidv4 } = require('uuid');

//Image Schema 
const imageSchema = new mongoose.Schema({
    uuid: { type: String, default: uuidv4 },
    name: { type: String, required: true }, 
    base64: { type: String },                
    driveLink: { type: String },  
})

//imageSet
const imageSchemaname = new mongoose.Schema({
    folderName : { type : String , required : true , unique : true},
    image : [imageSchema],
    createdAt : { type : Date , default : Date.now},
})

//task creation
const taskname = new mongoose.Schema({
    folderName : { type : String , required : true , unique : true},
    imagesets : [imageSchemaname],
    createdAt : { type : Date , default : Date.now},
})


//multiple user
const formultipleuser = new mongoose.Schema({
    uid : { type : String , required : true , unique : true},
    folders : [taskname],
})

module.exports = mongoose.model('starstork_database',formultipleuser);
