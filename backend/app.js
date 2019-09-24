const express=require('express');  // import express package n assigned to express variable
const Post=require('./models/post');
const bodyParser=require('body-parser');   // neet to code req.body
const mongoose=require('mongoose');
const app=express(); //exucurte that express packagein here

mongoose.connect("mongodb+srv://thiliniWathsala:ilovemymom@cluster0-v9j3h.mongodb.net/postsharingapdb?retryWrites=true&w=majority")
.then(()=>{
  console.log("mongodb is connected successfully!");
})
.catch(()=>{
  console.log("Connection failed!");
});

/*   app.use((req,res,next)=>{
   console.log('hellow first');
     next(); // next() used to call 2nd app.use() method or methods below in first app.use method
})*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



//headers are used to connect defferent domain like port 4200 and port 3000 without any issue
app.use((req,res,next)=>{   //this is ued to cover all incoming requests
  res.setHeader("Access-Control-Allow-Origin","*");           //this is used manipulate the request(first argument is header key,2ns argument is value for the header)
  res.setHeader("Access-Control-Allow-Headers",         // "*" means no matter witch domain the app, witch domain is sending the request ,allow all the requests
  "Origin,X-Requested-With, Content-Type, Accept") ;     // this means incoming requests may have these extra headers      
  
  res.setHeader("Access-Control-Allow-Methods",
  "GET,POST,PATCH,DELETE,OPTION");
  next();
})      



app.post('/api/posts',(req,res)=>{
  const post=new Post({   // create a Post model type object
      title:req.body.title,
      content:req.body.content
  });

  post.save();  //save method is provided by mongoose package  
  res.status(201).json({   // this is a typical status code for tell everything is ok and add new resourses
    message:'Post added successfully!'  // after getting post request send thiss mssage response
  });
});




app.use('/api/posts',(req,res,next)=>{
  Post.find().then(documents=>{
    console.log(documents);
    res.status(200).json({ // this is a typical status code for tell everything is ok and but NOT add new resourses
      message:'post fetched is successfully!',
      posts:documents
    
  });

});

});


module.exports=app;  // export the app