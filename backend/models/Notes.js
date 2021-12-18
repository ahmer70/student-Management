const mongoose=require('mongoose');
const User = require("./User");
const {Schema}=mongoose;

const NotesSchema=new Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,
ref:User,
default:"General"
    },
title:{
 type:String,
 required:true,   
},
description:{
    type:String,
    required:true,
},
tag:{
    type:String,
    default:"General"
},
date:{
    type:Date,
    default:Date.now
},
imageName:{
    type:String,
    default:"none",
    required:true
},
imageData:{
    type:String,
    required:true
}
});
module.exports = mongoose.model('notes',NotesSchema)