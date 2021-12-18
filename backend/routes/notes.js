const express = require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Notes=require("../models/Notes");
const { body
    , validationResult } = require("express-validator");
//Rout 1:Get All Notes using GET
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id});
    res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});

//Rout 2 Add Notes using post
router.post('/addnotes',fetchuser,[
    body('title','add title atleaset 3 character').isLength({min:3}),
    body('description','Please ADD dec atleat 5 character').isLength({min:5})
],async(req,res)=>{
try {
    const {user,title, description,tag}=req.body;

///if thair is any error  return bad request

const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
const notes=new Notes({
    user,title,description,tag,user:req.user.id
})
const savenotes=await notes.save();
res.json(savenotes);
} catch (error) {
    console.error(error.message);
    res.status(500).send('Internal erver error');
}
});

//for img

const multer = require('multer');
var Image=require('../models/Notes') 
var ImageRouter=express.Router();


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {   
        cb(null,  Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  //  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(file.mimetype=='image/jpeg' ||file.mimetype=='image/jpg' || file.mimetype=='image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*2024*5
    },
    fileFilter:fileFilter
})
ImageRouter.route("/uploadmulter").post(upload.single('imageData'),(req,res,next)=>{
console.log(req.body);
const newImage=new Image({
    imagesName:req.body.imagesName,
    imagesData:req.file.path
})
newImage.save().then((result)=>{
    console.log(result);
    res.status(200).json({
        Success:true,
        document:result
    }).catch((err)=>next(err));
})
})






//for end img



//Rout 3 update Notes using put login required

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const{title,description,tag}=req.body;
    try {
        const newNotes={};
    if(title){
        newNotes.title=title;     
    }
    if(description){
        newNotes.description=description;
    }
    if(tag){
        newNotes.tag=tag;
    }
    let note=await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true})
res.json({note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal erver error');
    }
});

//Rout 4 delete Notes using put login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
try {
    
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("NOt Allowed")
    }
    note=await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note Deleted Successfully"})
} catch (error) {
    console.error(error.message);
    res.status(500).send('Internal erver error');
}
})

module.exports = router