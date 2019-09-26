const express=require('express');

const router=express();
const Post=require('../models/post');
//const bodyParser=require('body-parser');   // neet to code req.body



router.post("",(req,res)=>{
    const post=new Post({   // create a Post model type object
        title:req.body.title,
        content:req.body.content
    });
  
    post.save()  //save method is provided by mongoose package  
    .then(createPost=>{
      res.status(201).json({   // this is a typical status code for tell everything is ok and add new resourses
        message:'Post added successfully!',  // after getting post request send thiss mssage response
        postId:createPost._id
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