const express=require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup",(req,res,next)=>{
    bcrypt.hash(req.body.password,10)    // why use 10?to reate a random number for encrypted data.  we cant unhash password after hash it
    .then(hash=>{
        const user = new User({
            email : req.body.email,
            password : hash   //put hash
        });
   
        user.save()
            .then(result=>{
              res.status(201).json({
               message :'user is created!',
               result : result
      
              });
            })

       .catch(err=>{
           res.status(500).json({
               error : err
           })      
       });
   
        
        });
});


router.post("/login",(req,res,next)=>{
    let fetchedUser;
    //console.log(req.body.email)
    User.findOne({email:req.body.email})
    .then(user=>{
 
        if(!user){
            return res.status(401).json({
                message:'Auth failed'
            });
        }
        fetchedUser=user;
        console.log("Req body"+req.body.password)
        console.log("u pw"+user.password)
        return bcrypt.compare(req.body.password, user.password);  // password comig from front end encrypt and compaer with password stored in database(same input will give same hash)
        
    })
 
    .then(result=>{
        
       console.log(result);
        if(!result){              //have boolean value from above then block (check the password is correct)
            return res.status(401).json({
                message:'Auth failed'
            });
        }
        const token =  jwt.sign({email: fetchedUser.email , userId: fetchedUser._id},   //create a jwt web tocken(jwt.sign) using email and id
            "secrete_this_should_be_longer",
            {expiresIn: "1h"}  //this set token will expire in 1 hour
        );  // second argument is payload,it shoud be  longer string
        console.log(token); 
        
        res.status(200).json({
            token: token    // return the token generating above code
          
        });
    })

    .catch(err=>{
        console.log(err);
        return res.status(401).json({
            message:'Auth failed'
        });
    })

});



module.exports= router;