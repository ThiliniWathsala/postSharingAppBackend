const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");  // used to  check uniquness of inputs(avoid duplicate id)

const userSchema = mongoose.Schema({
    email: {type : String, require : true, unique : true},
    password: {type : String, require : true}
});

userSchema.plugin(uniqueValidator);   // using plugin uniqueValidator connect to userSchema   ,now we can check user is already exist

module.exports = mongoose.model("User",userSchema); 
