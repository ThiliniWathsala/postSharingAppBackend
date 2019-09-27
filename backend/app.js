const express=require('express');  // import express package n assigned to express variable
const bodyParser=require('body-parser');   // neet to code req.body  n used to extrace body of incomung requests (but not for files)----
const mongoose=require('mongoose');
const postRoutes=require('./routes/post');
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
  "GET,POST,PATCH,PUT,DELETE,OPTION");
  next();
})      



app.use("/api/posts",postRoutes);     //  api/post walin patan ganna onima url ekak postRoutes ekata call krnwa   postRoute hav all mothods related to posts collection in mongo
 module.exports=app;  // export the app