const express= require('express');
const multer = require('multer');
const router=express();
const Post=require('../models/post');
//const bodyParser=require('body-parser');   // neet to code req.body

const MIME_TYPE_MAP ={    // define mime type and their extension
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image/jpg': 'jpg'
};


const storage =  multer.diskStorage({         //define where multer should put files which  detects in the incoming requests
   destination:(req,file,cb)=>{                           // it detects the file when multer going to save  , file is file thah extracted,cb is callback
   const isValid=MIME_TYPE_MAP[file.mimetype];           // validate the incoming mimetype match to defined mimetype above
   let error = new Error("Invalid mimetype");
    if(isValid){
      error = null;
    }
    
      cb(error,"backend/images") ;                 //path want to be save images

    
  },

  filename:(req,file,cb)=>{
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-') ;//any whitespace in the file name replace with -
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null,name + '-' + Date.now() + '.' + ext);           // create specific file name using incoming filename n date and extension
  }
});                       


router.post("",multer({storage:storage}).single("image"),(req,res)=>{    //single("image") i expected incoming one is single file
   const url =req.protocol + '://' + req.get("host"); 
   const post=new Post({   // create a Post model type object

        title:req.body.title,
        content:req.body.content,
        imagePath : url + "/images/" + req.file.filename
      });
  
    post.save()  //save method is provided by mongoose package  
    .then(createPost=>{
      res.status(201).json({   // this is a typical status code for tell everything is ok and add new resourses
        message:'Post added successfully!',  // after getting post request send thiss mssage response
        post:{
          ...createPost,     // create a copy of createPost with all propoties
          _id:createPost._id,
         /* title:createPost.title,
          content:createPost.content,
          imagepath:createPost.imagepath*/

        }
    });
   
    });
  });
  
  
  
  router.put("/:id",(req,res,next)=>{
    const post =new Post({
      _id:req.body._id,
      title:req.body.title,
      content:req.body.content
    });
    
    Post.updateOne({_id:req.params.id},post).then(result=>{   // id id get from url
      console.log(result);
      res.status(200).json({message:'Update successful!'});                   
      
    });   
  });
  
  /*
   router.put('api/posts/:id',(req,res,next)=>{
    const post=new Post({
      _id:req.body.id,
      title:req.body.title,
      content:req.body.content
  
    });
    Post.updateOne({ _id:req.params.id},post)
        .then(result=>{   // id is extract from :id in url
          console.log(result);
          res.status(200).json({message:'Update successful!'})
          
      });
   
  });
  
  */
  
  router.get("",(req,res,next)=>{
    Post.find().then(documents=>{
      console.log(documents);
      res.status(200).json({ // this is a typical status code for tell everything is ok and but NOT add new resourses
        message:'post fetched is successfully!',
        posts:documents
      
    });
  
  });
  });
  
  
  
  router.delete("/:id",(req,res,next)=>{
   // console.log(req.params.id);  // params is used to fetch encorded parameters(ex: id) from rquest from  frontend
   Post.deleteOne({_id:req.params.id})
    .then((result)=>{
      console.log(result);  
      res.status(200).json({message:"post is deleted!"});
    });
     
  });
  
  module.exports=router;