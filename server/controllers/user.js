const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require("express-async-handler")
const User=require("../models/user")

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,userType}=req.body

    if(!email || !name || !password || !userType){
        res.status(400)
        throw new Error("please fill all the details")
    }

    const userExists= await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("user already exist")
    }

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const user=await User.create({
        name:name,
        email:email,
        password:hashedPassword,
        userType:userType,
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            userType:user.userType,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password,userType}=req.body
    
    if(!email || !password || !userType){
         res.status(400)
         throw new Error("please enter all the fields")
    }
    const user=await User.findOne({email})
    
    // compare password 
    if(user && await bcrypt.compare(password,user.password)){
            res.json({
                _id:user.id,
                name:user.name,
                email:user.email,
                userType:user.userType,
                token:generateToken(user._id)
            })
    }else{
        res.status(400)
        throw new Error("invalid credentials")
    }
})

const getInfo=asyncHandler(async(req,res)=>{
    res.json(req.user)
})

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports={registerUser,loginUser,getInfo}