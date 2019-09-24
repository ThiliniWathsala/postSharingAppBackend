const mongoose=require('mongoose');

const postSchema=mongoose.Schema({       //this is only blue print,to use this we need to create model as below 
    title:{type:String, required:true},
    content:{type:String, required:true}
});

//export the mongoosemodul and now can be used in outside of this file
module.exports=mongoose.model('Post',postSchema)   //Post is name of model and postScema is schema of the model