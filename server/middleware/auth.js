const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User=require("../models/user")


const authMiddleware=asyncHandler(async(req,res,next)=>{
      let token;

      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // get token from header
            token=req.headers.authorization.split(' ')[1]

            //verify
            const decoded=jwt.verify(token,process.env.JWT_SECRET)

            // get user from the token
            req.user=await User.findById(decoded.id).select('-password')  // we don't want hashed pass so remove it 

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized no token')
        }
      }

      if(!token){
        res.status(401)
        throw new Error('Not authorized')
      }
})

module.exports=authMiddleware