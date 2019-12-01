const jwt=require("jsonwebtoken");

module.exports = (req,res,next)=>{

    try{
    const token = req.headers.autherization.split(" ")[1]; 
    console.log(token);
    jwt.verify(token, "secrete_this_should_be_longer");
    next();
}catch(error) {
    res.status(401).json({message:"Auth is failed!"});
}
};