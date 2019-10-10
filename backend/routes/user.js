const express=require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup",(req,res,next)=>{
    bcrypt.hash(req.body.password,10)    // why use 10?  we cant unhash password after hash it
    .then(hash=>{
        const user = new User({
            email : req.body.email,
            password : req.body.password
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
    User.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            return res.status(401).json({
                message:'Auth failed'
            });
        }
        return bcrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        if(!result){              //have boolean value from above then block (check the password is correct)
            return res.status(401).json({
                message:'Auth failed'
            });
        }
        const token =  jwt.sign({email: user.email , userId: user._id},
            'secrete_this_should_be_longer',
            {expiresIn: "1h"}
        );  // second argument is payload,it shoud be  longer string

    })

    .catch(err=>{
        return res.status(401).json({
            message:'Auth failed'
        });
    })

});



module.exports= router;